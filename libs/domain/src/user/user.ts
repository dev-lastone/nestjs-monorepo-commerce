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
import { userEmail, userName } from '@common/constant/example';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';

export class User extends MyBaseEntity {
  @ApiProperty({
    example: userName,
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
    example: userEmail,
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

  static async create(dto: CreateUserDto) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await UserPassword.create(dto.password);

    await validateOrReject(user);

    return user;
  }
}
