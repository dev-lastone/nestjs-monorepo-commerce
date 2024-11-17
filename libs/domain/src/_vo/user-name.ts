import { Column } from 'typeorm';
import { IsNotEmpty, IsString, Length, validateSync } from 'class-validator';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export class UserName {
  // TODO ApiProperty example 재활용 방법 고민
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  private value: string;

  static create(
    name: string,
    options?: {
      httpStatus: HttpStatus;
    },
  ) {
    // return new UserName(name);
    const userName = new UserName();
    userName.value = name;

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

    return userName;
  }
}
