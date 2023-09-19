import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IncomingUserDTO } from './dto/incoming-user-dto';
import { S3Service } from 'src/services/s3/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private s3Service: S3Service,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: IncomingUserDTO) {
    // let preAuthURL = '';
    // if (createUserDto.imageFileName && createUserDto.imageFileType) {
    //   preAuthURL = await this.s3Service.putImageObjectSignedUrl(
    //     createUserDto.imageFileName,
    //     createUserDto.imageFileType,
    //   );
    // }
    const userBody: CreateUserDto = {
      profilePhoto: createUserDto.profilePhoto,
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      climbingProfile: {
        trOnly: createUserDto.trOnly,
        leadCapable: createUserDto.lead,
        boulderer: createUserDto.boulder,
        trWarmup: createUserDto.trWarmUp,
        trOnsight: createUserDto.trOnsight,
        trRedpoint: createUserDto.trRedpoint,
        leadWarmup: createUserDto.leadWarmUp,
        leadOnsight: createUserDto.leadOnsight,
        leadRedpoint: createUserDto.leadRedpoint,
        boulderWarmup: createUserDto.boulderWarmUp,
        boulderOnsight: createUserDto.boulderOnsight,
        boulderRedpoint: createUserDto.boulderRedpoint,
      },
    };
    userBody.password = await bcrypt.hash(userBody.password, saltOrRounds);
    const newUser = await this.usersRepository.save(userBody);
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string, relations: string[] = []) {
    const incomingUser = await this.usersRepository.findOne({
      where: {
        email: email,
      },
      relations: relations,
    });
    if (incomingUser) {
      let imageGetURL = '';
      if (incomingUser.profilePhoto) {
        imageGetURL = await this.s3Service.getImageObjectSignedUrl(
          incomingUser.profilePhoto,
        );
      }
      incomingUser.password = null;
      return { ...incomingUser, imageGetURL };
    }
    return null;
  }

  async findOne(id: string, relations: string[] = []) {
    const incomingUser = await this.usersRepository.findOne(id, { relations });
    if (incomingUser) {
      let imageGetURL = '';
      if (incomingUser.profilePhoto) {
        imageGetURL = await this.s3Service.getImageObjectSignedUrl(
          incomingUser.profilePhoto,
        );
      }
      incomingUser.password = null;
      return { ...incomingUser, imageGetURL };
    }
    return null;
  }

  findByIds(ids: string[], relations: string[] = []) {
    return this.usersRepository.findByIds(ids, { relations });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });
    const allUserInfo = await this.findOne(updatedUser.id, ['climbingProfile']);
    if (allUserInfo.profilePhoto) {
      const imageGetURL = await this.s3Service.getImageObjectSignedUrl(
        allUserInfo.profilePhoto,
      );
      return { ...allUserInfo, imageGetURL };
    }
    return allUserInfo;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async userLogIn(email: string) {
    const user = await this.usersRepository.findOne({
      select: [
        'id',
        'email',
        'password',
        'firstName',
        'lastName',
        'profilePhoto',
        'finderVisibility',
      ],
      where: { email: email },
    });
    if (user) {
      let imageGetURL = '';
      if (user.profilePhoto) {
        imageGetURL = await this.s3Service.getImageObjectSignedUrl(
          user.profilePhoto,
        );
      }
      return { ...user, imageGetURL };
    }
  }
}
