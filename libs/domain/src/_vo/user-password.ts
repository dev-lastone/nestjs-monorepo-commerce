import { Column } from 'typeorm';
import {
  IsNotEmpty,
  Length,
  validateOrReject,
  validateSync,
} from 'class-validator';
import { genSaltSync, hashSync } from 'bcrypt';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export class UserPassword {
  // TODO 특문 조합 룰 추가
  @IsNotEmpty()
  @Length(8, 20)
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  private value: string;

  constructor(
    value: string,
    options?: {
      httpStatus: HttpStatus;
    },
  ) {
    this.value = value;

    const errors = validateSync(this);
    if (errors.length > 0) {
      const errorConstraints = errors.map((error) => {
        return error.constraints;
      });

      if (options?.httpStatus === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(errorConstraints);
      } else {
        throw new Error(JSON.stringify(errorConstraints));
      }
    }
  }

  static async create(text: string) {
    const password = new UserPassword(text);

    const salt = await genSaltSync();
    password.value = await hashSync(password, salt);

    return password;
  }

  static async validate() {
    await validateOrReject(this);
  }

  getValue() {
    return this.value;
  }
}
