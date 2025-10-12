import { PrismaService } from '@/utils/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithPassword } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserByUsername(username: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async createUser(data: CreateUserDto): Promise<UserWithPassword | null> {
    const isUserExist = await this.getUserByUsername(data.username);
    if (isUserExist)
      throw new BadRequestException(
        'User with the same name are already exists',
      );
    return this.prisma.user.create({ data });
  }
}
