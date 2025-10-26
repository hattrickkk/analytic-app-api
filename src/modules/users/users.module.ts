import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@/utils/prisma/prisma.module';
import { PasswordService } from '@/utils/password/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
