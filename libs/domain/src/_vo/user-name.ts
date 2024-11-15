import { Column } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  Length,
  validateOrReject,
} from 'class-validator';

export class UserName {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  name: string;

  static create(name: string) {
    const userName = new UserName();
    userName.name = name;

    this.validate();

    return userName;
  }

  static async validate() {
    await validateOrReject(this);
  }
}
