import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '@/utils/prisma/prisma.module';
import { PasswordService } from '@/utils/password/password.service';
import { JwtStrategy } from '@/strategies/jwt.strategy';
import { LocalStrategy } from '@/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy, LocalStrategy],
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.getOrThrow('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '60m', algorithm: 'HS256' },
          verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
