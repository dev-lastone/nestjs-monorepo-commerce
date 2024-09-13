import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  id: number;
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  password: string;
}
