import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './users.schema';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UsersDocument>) {}

  async getUsers(): Promise<UserDTO[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      console.error(e);
    }
  }

  async getUserByUsername(username: string): Promise<UserDTO> {
    try {
      return await this.userModel.findOne({
        username: username,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async setUser(username: string, passwordHash: string): Promise<UserDTO> {
    try {
      const createUser = new this.userModel({
        username: username,
        password: passwordHash,
      });
      return createUser.save();
    } catch (e) {
      return e;
    }
  }

  async deleteUser(userId: string) {
    return 'delete user';
  }
}
