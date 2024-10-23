import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'app' })
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ default: '홍길동' })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;
  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  @Column({ name: 'password', type: 'varchar', length: 50 })
  password: string;
}
