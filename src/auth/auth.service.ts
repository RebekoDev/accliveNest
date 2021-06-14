import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UserDTO } from './auth.dto';
import { saltRounds } from '../server.config';

@Injectable()
export class AuthService {
  async login() {
    const salt = await genSalt();
    return salt;
  }

  async registration(user: UserDTO) {
    const salt = await genSalt(saltRounds);
    const passwordHash = await hash(user.password, salt);
    return passwordHash;
  }
}
