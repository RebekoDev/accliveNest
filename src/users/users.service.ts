import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UsersDocument>) {}

  async getUsers(): Promise<Users[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      console.error(e);
    }
  }

  async getUserByUsername(username: string): Promise<Users> {
    try {
      return await this.userModel.findOne({
        username: username,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async setUser(username: string, passwordHash: string): Promise<Users> {
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
