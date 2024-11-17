import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty, validateSync } from 'class-validator';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export class Email {
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  private readonly value: string;

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

      if (options.httpStatus === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(errorConstraints);
      } else {
        throw new Error(JSON.stringify(errorConstraints));
      }
    }
  }

  static create(value: string) {
    return new Email(value);
  }
}
