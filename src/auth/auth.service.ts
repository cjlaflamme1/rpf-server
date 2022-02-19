import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { IncomingUserDTO } from 'src/user/dto/incoming-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log('validating');
    const user = await this.userService.userLogIn(email);
    this.logger.log(user.email);
    const match = await bcrypt.compare(pass, user.password);
    this.logger.log(match);

    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { email, id } = user;
    const payload = { email: email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
      email: email,
      loggedIn: true,
    };
  }

  async signUp(user: IncomingUserDTO) {
    const { id, email } = await this.userService.create(user);
    const payload = { email: email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      email: email,
      loggedIn: true,
    };
  }
}
