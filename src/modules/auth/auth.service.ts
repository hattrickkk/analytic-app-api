import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/utils/prisma/prisma.service';
import { PasswordService } from '@/utils/password/password.service';
import { Response, Request } from 'express';
import { isDev } from '@/utils/isDev';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';

const REFRESH_TOKEN_COOKIE = 'refreshToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private configService: ConfigService,
  ) {}

  private generateTokens = (id: number) => {
    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  };

  private setCookie(res: Response, value: string) {
    res.cookie(REFRESH_TOKEN_COOKIE, value, {
      httpOnly: true,
      domain: this.configService.getOrThrow('COOKIE_DOMAIN'),
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  private auth(res: Response, id: number) {
    const { access_token, refresh_token } = this.generateTokens(id);
    this.setCookie(res, refresh_token);
    return { access_token };
  }

  async refresh(res: Response, req: Request) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE] as string;
    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

    // id пользователя
    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
      select: { id: true },
    });

    if (!user) throw new NotFoundException("User wasn't found");

    return this.auth(res, user?.id);
  }

  async validateUser(username: string, plainPassword: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user)
      throw new NotFoundException(`User with ${username} username didnt found`);

    const isPasswordValid = await this.passwordService.comparePasswords(
      plainPassword,
      user.password,
    );

    if (!isPasswordValid)
      throw new NotFoundException(
        `User with ${username} username has invalid password`,
      );

    const { password, ...rest } = user;

    return rest;
  }

  async register(res: Response, createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    if (user) {
      const { access_token } = this.auth(res, user.id);
      return {
        access_token,
        user,
      };
    }
  }

  login(res: Response, user: User) {
    const { access_token } = this.auth(res, user.id);

    return {
      access_token,
      user,
    };
  }
}
