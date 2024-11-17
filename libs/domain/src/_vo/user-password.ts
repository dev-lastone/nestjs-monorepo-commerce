import { Column } from 'typeorm';
import { IsNotEmpty, Length, validateSync } from 'class-validator';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ApiProperty } from '@nestjs/swagger';

export class UserPassword {
  // TODO 특문 조합 룰 추가
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

    const errors = validateSync(this);
    if (errors.length > 0) {
      const errorConstraints = errors.map((error) => {
        return error.constraints;
      });

      throw new Error(JSON.stringify(errorConstraints));
    }

    const salt = await genSaltSync();
    password.value = await hashSync(password.value, salt);

    return password;
  }

  async compare(password: UserPassword) {
    const isPasswordValid = await compareSync(password.getValue(), this.value);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }
  }

  getValue() {
    return this.value;
  }
}
