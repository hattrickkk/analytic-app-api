import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  constructor(username: string, password: string, roleId: number = 0) {
    this.username = username;
    this.password = password;
    this.roleId = roleId;
  }

  @ApiProperty({ example: 'admin', description: 'Имя пользователя' })
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long.',
  })
  username: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long.',
  })
  password: string;

  @IsInt()
  @Optional()
  roleId: number;
}
