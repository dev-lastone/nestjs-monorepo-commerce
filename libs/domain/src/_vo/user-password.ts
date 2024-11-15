import { Column } from 'typeorm';
import { IsNotEmpty, Length, validateOrReject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { genSaltSync, hashSync } from 'bcrypt';

export class UserPassword {
  // TODO 특문 조합 룰 추가
  @ApiProperty({ example: 'string1234' })
  @IsNotEmpty()
  @Length(8, 20)
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  private value: string;

  constructor(text: string) {
    // if (text.length < 8) {
    //   throw new BadRequestException(
    //     'Password must be at least 8 characters long',
    //   );
    // }
    this.value = text;
  }

  static async create(text: string) {
    const password = new UserPassword(text);

    this.validate();

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
