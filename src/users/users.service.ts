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
}
