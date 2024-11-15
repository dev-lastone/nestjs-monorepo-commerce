import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty, validateOrReject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Email {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  private readonly value: string;

  constructor(email: string) {
    this.value = email;
  }

  static create(email: string) {
    const _email = new Email(email);

    this.validate();

    return _email;
  }

  static async validate() {
    await validateOrReject(this);
  }
}
