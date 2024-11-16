import { Column } from 'typeorm';
import { IsNotEmpty, IsString, Length, validateSync } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class UserName {
  // TODO ApiProperty example 재활용 방법 고민
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  private readonly value: string;

  constructor(name: string) {
    this.value = name;

    const errors = validateSync(this);
    // TODO client 400 server 500
    if (errors.length > 0) {
      throw new BadRequestException();
    }
  }

  static create(name: string) {
    return new UserName(name);
  }
}
