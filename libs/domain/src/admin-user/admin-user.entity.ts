import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO admin jwt 별도 발급시 admin domain 으로 이동 예정
@Entity('user', { schema: 'admin' })
export class AdminUser {
  @PrimaryGeneratedColumn()
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
