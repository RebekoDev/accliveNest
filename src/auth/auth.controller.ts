import { Controller, Post, Body } from '@nestjs/common';
import { Users } from '../users/users.schema';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('auth/login')
  login(@Body() user: Users) {
    return this.authServise.login(user);
  }

  @Post('auth/logout')
  logout() {
    return 'logout';
  }

  @Post('auth/registration')
  registartion(@Body() user: Users) {
    return this.authServise.registration(user);
  }
}
