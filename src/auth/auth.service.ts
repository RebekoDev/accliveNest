import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UserDTO } from './auth.dto';
import { saltRounds } from '../server.config';
import { Users, UsersDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<UsersDocument>) {}

  async login() {
    const salt = await genSalt();
    return salt;
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
