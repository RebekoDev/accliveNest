import { Injectable, UnauthorizedException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDTO } from '../users/users.dto';
import { saltRounds } from '../server.config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(user: UserDTO): Promise<UserDTO | Error> {
    try {
      const validUser = await this.usersService.getUserByUsername(
        user.username,
      );
      if (!validUser) {
        return new UnauthorizedException('Данный пользователь не найден');
      }
      const isValidUser = await compare(user.password, validUser.password);
      if (!isValidUser) {
        return new UnauthorizedException('Введен неверный пароль');
      }
      return validUser;
    } catch (e) {
      return e;
    }
  }

  async registration(user: UserDTO): Promise<UserDTO | Error> {
    try {
      const validUser = await this.usersService.getUserByUsername(
        user.username,
      );
      if (validUser) {
        return new UnauthorizedException(
          'Пользователь с таким именем уже существует',
        );
      }
      const salt = await genSalt(saltRounds);
      const passwordHash = await hash(user.password, salt);
      const createUser = await this.usersService.setUser(
        user.username,
        passwordHash,
      );
      return createUser;
    } catch (e) {
      return e;
    }
  }
}
