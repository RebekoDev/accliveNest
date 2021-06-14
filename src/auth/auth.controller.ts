import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('auth/login')
  login() {
    return this.authServise.login();
  }

  @Post('auth/logout')
  logout() {
    return 'logout';
  }

  @Post('auth/registration')
  registartion(@Body() user: UserDTO) {
    return this.authServise.registration(user);
  }
}