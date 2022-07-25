import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IncomingUserDTO } from './dto/incoming-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: IncomingUserDTO) {
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
    return this.usersRepository.save(userBody);
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
      incomingUser.password = null;
      return incomingUser;
    }
    return null;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });
    return this.usersRepository.findOne(updatedUser.id);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async userLogIn(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
}
