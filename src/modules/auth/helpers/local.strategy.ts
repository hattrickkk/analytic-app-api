import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserWithPassword } from '@/modules/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }
  async validate(
    username: string,
    plainPassword: string,
  ): Promise<Omit<UserWithPassword, 'password'>> {
    const user = await this.authService.validateUser(username, plainPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...userData } = user;
    return userData;
  }
}
