import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDTO } from '../users/users.dto';
import { saltRounds } from '../server.config';
import { Users } from '../users/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(user: UserDTO): Promise<Users | Error> {
    try {
      const validUser = await this.usersService.getUserByUsername(
        user.username,
      );
      if (!validUser) {
        return new HttpException(
          'Данный пользователь не найден',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const isValidUser = await compare(user.password, validUser.password);
      if (!isValidUser) {
        return new HttpException(
          'Введен неверный пароль',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return validUser;
    } catch (e) {
      return e;
    }
  }

  async registration(user: UserDTO): Promise<Users | Error> {
    try {
      const validUser = await this.usersService.getUserByUsername(
        user.username,
      );
      if (validUser) {
        return new HttpException(
          'Пользователь с таким именем уже существует',
          HttpStatus.CONFLICT,
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
