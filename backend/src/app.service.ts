import { Injectable } from '@nestjs/common';
import { User } from './auth/schemas/user.schema';

@Injectable()
export class AppService {
  getHello(userData: User): string {
    return `Welcome to the application. ${userData?.name}!`;
  }
}
