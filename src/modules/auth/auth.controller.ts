import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from '@/decorators/public';
import { AuthGuard } from '@nestjs/passport';

export interface RequestWithUser extends Request {
  user: { id: number; username: string }; 
}

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: RequestWithUser) {
    const { username, id } = req.user;
    return this.authService.login({ username, id });
  }
}
