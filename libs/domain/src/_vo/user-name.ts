import { Column } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  Length,
  validateOrReject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserName {
  @ApiProperty({
    example: '홍길동',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  value: string;

  static create(name: string) {
    const userName = new UserName();
    userName.value = name;

    this.validate();

    return userName;
  }

  static async validate() {
    await validateOrReject(this);
  }
}
