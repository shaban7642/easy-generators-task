import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { Authorization: authorization }: any = request.cookies;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Unauthorized. Please login first.');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateToken(authToken);
      const user = await this.authService.getOneUser({ _id: resp.id });
      if (!user) {
        throw new UnauthorizedException('Unauthorized. Please login first.');
      }
      request.decodedData = resp;
      request.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
