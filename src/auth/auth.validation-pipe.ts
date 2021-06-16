import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserDTO } from '../users/users.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: UserDTO) {
    if (!value.username) {
      throw new HttpException(
        'Не введено имя пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!value.username) {
      throw new HttpException('Не введен пароль', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
