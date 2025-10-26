import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  constructor(username: string, password: string, roleId: number = 0) {
    this.username = username;
    this.password = password;
  }

  @ApiProperty({ example: 'admin', description: 'Имя пользователя' })
  @IsNotEmpty({ message: 'Username field is required' })
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long.',
  })
  username: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsNotEmpty({ message: 'Username field is required' })
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long.',
  })
  password: string;
}
