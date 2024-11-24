import { Column } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserPasswordValidation } from '@common/decorator/user-password-validation.decorator';

export class UserPassword {
  @UserPasswordValidation()
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
