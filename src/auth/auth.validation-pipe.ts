import {
  PipeTransform,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from '../users/users.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: UserDTO) {
    if (!value.username) {
      throw new UnauthorizedException('Не введено имя пользователя');
    }

    if (!value.password) {
      throw new UnauthorizedException('Не введен пароль');
    }
    return value;
  }
}
