import { Column } from 'typeorm';
import { IsNotEmpty, Length, validateOrReject } from 'class-validator';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ApiProperty } from '@nestjs/swagger';

export class UserPassword {
  // TODO 커스텀 데코레이터로 분리
  @ApiProperty({
    example: 'string1234',
    description: '비밀번호',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @Length(8, 20)
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  private value: string;

  static async create(value: string) {
    const password = new UserPassword();
    password.value = value;

    await validateOrReject(password);

    const salt = await genSaltSync();
    password.value = await hashSync(password.value, salt);

    return password;
  }

  async compare(password: string) {
    const isPasswordValid = await compareSync(password, this.value);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }
  }
}
