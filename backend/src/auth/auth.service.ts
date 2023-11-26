import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userData: SignUpDto): Promise<User> {
    const { name, email, password } = userData;

    try {
      const user = await this.userModel.create({
        name,
        email,
        password,
      });

      return user;
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Duplicated Email Entered');
      }
    }
  }

  async getOneUser(query: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne(query);
    return user;
  }

  createCookie(token: string): string {
    return `Authorization=${token}; SameSite=None; Secure; HttpOnly;  Domain=${process.env.MAIN_DOMAIN}; Path=/; Max-Age=${process.env.JWT_EXPIRES};`;
  }

  generateToken(tokenData: { id: string }): string {
    return this.jwtService.sign(tokenData);
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
