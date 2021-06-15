import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDTO } from './auth.dto';
import { saltRounds } from '../server.config';
import { Users, UsersDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<UsersDocument>) {}

  async login(user: UserDTO): Promise<Users | Error> {
    try {
      const validUser = await this.userModel.findOne({
        username: user.username,
      });
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

  async registration(user: UserDTO): Promise<Users> {
    try {
      const salt = await genSalt(saltRounds);
      const passwordHash = await hash(user.password, salt);
      const createUser = new this.userModel({
        username: user.username,
        password: passwordHash,
      });
      return createUser.save();
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
