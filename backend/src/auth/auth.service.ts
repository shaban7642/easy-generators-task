import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { TokenData } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: User }> {
    const { name, email, password } = signUpDto;

    try {
      const user = await this.userModel.create({
        name,
        email,
        password,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { user, token };
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Duplicated Email Entered');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { user, token };
  }

  async getOneUser(query: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne(query);
    return user;
  }

  createCookie(token: string): string {
    return `Authorization=${token}; SameSite=None; Secure; HttpOnly;  Domain=${process.env.MAIN_DOMAIN}; Path=/; Max-Age=${process.env.JWT_EXPIRES};`;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
