import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.userLogIn(email);
    const match = await bcrypt.compare(pass, user.password);

    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { email, id } = user;
    const payload = { email: email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
      id: id,
    };
  }

  async signUp(user: CreateUserDto) {
    const { id, email } = await this.userService.create(user);
    const payload = { email: email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      id: id,
    };
  }
}
