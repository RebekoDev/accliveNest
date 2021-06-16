import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from '../users/users.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from './auth.validation-pipe';

@Controller()
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('auth/login')
  login(@Body(ValidationPipe) user: UserDTO) {
    return this.authServise.login(user);
  }

  @Post('auth/logout')
  logout() {
    return 'logout';
  }

  @Post('auth/registration')
  registartion(@Body(ValidationPipe) user: UserDTO) {
    return this.authServise.registration(user);
  }
}
