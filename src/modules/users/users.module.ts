import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/utils/prisma/prisma.service';
import { PrismaModule } from '@/utils/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
