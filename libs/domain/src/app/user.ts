import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AppUser {
  id: number;
  @ApiProperty({ default: '홍길동' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  password: string;
}
