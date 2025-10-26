import { PrismaService } from '@/utils/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserWithPassword } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '@/utils/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number): Promise<UserWithPassword | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User wasnot found');

    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserByUsername(username: string): Promise<UserWithPassword | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async createUser(data: CreateUserDto): Promise<User | null> {
    const isUserExist = await this.getUserByUsername(data.username);
    if (isUserExist)
      throw new ConflictException('User with the same name are already exists');

    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );

    const createdUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        roleId: data.roleId || 1,
      },
    });

    const { password, ...userData } = createdUser;
    return userData;
  }
}
