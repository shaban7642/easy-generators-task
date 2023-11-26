import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ user: User; token: string; success: boolean }> {
    const user = await this.authService.createUser(signUpDto);

    const token = this.authService.generateToken({ id: user._id });
    const cookie = this.authService.createCookie(token);
    // add the token to the cookies
    res.setHeader('Set-Cookie', [cookie]);
    return { user, token, success: true };
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ user: User; token: string; success: boolean }> {
    const { email, password } = loginDto;

    const user = await this.authService.getOneUser({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.authService.generateToken({ id: user._id });
    const cookie = this.authService.createCookie(token);
    // add the token to the cookies
    res.setHeader('Set-Cookie', [cookie]);
    return { user, token, success: true };
  }
}
