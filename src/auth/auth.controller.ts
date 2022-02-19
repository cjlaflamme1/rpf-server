import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IncomingUserDTO } from 'src/user/dto/incoming-user-dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  signUp(@Body() createUserDto: IncomingUserDTO) {
    this.logger.log('ping signup');
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginBody: { email: string; password: string },
    @Request() req,
  ) {
    return this.authService.login(req.user);
  }
}
