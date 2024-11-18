import { Column } from 'typeorm';
import { validateSync } from 'class-validator';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

export class UserPassword {
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

  async compare(password: string) {
    const isPasswordValid = await compareSync(password, this.value);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }
  }

  getValue() {
    return this.value;
  }
}
