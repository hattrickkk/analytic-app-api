import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '@/utils/password/password.service';
import { UsersService } from '../users/users.service';
import { UserWithPassword } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserWithPassword | null> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new BadRequestException('User not found');

    const isPasswordMatch = await this.passwordService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: { id: number; username: string }) {
    const payload = { username: user.username, sub: user.id };
    const dbUser = await this.userService.getUserById(user.id);
    if (!dbUser) return null;
    const { password, ...userData } = dbUser;

    return {
      accessToken: this.jwtService.sign(payload),
      user: userData,
    };
  }
}
