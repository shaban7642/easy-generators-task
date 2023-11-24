import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ user: User; token: string; success: boolean }> {
    const { user, token } = await this.authService.signUp(signUpDto);
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
    const { user, token } = await this.authService.login(loginDto);
    const cookie = this.authService.createCookie(token);
    // add the token to the cookies
    res.setHeader('Set-Cookie', [cookie]);
    return { user, token, success: true };
  }
}
