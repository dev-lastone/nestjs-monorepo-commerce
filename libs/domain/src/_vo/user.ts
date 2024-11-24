import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  validateOrReject,
} from 'class-validator';
import { Column } from 'typeorm';
import { UserPassword } from '@domain/_vo/user-password';

export class User {
  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    type: String,
    minLength: 2,
    maxLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    type: String,
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column(() => UserPassword, { prefix: false })
  password: UserPassword;

  static async create(dto: { name: string; email: string; password: string }) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await UserPassword.create(dto.password);

    await validateOrReject(user);

    return user;
  }
}
