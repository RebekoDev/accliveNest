import { Controller, Get, Post, Body } from '@nestjs/common';
import { Users } from './auth.schema';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('auth/login')
  login(@Body() user: Users) {
    const test = this.authServise.login(user);
    return test;
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
