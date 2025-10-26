import { JwtPayload } from '@/modules/auth/interfaces/jwt-payload.interface';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: configService.getOrThrow('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    return await this.usersService.getUserById(payload.id);
  }
}
