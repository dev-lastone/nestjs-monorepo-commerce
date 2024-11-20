import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  validateSync,
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { UserPassword } from '@domain/_vo/user-password';

// TODO admin jwt 별도 발급시 admin domain 으로 이동 예정
@Entity('user', { schema: 'admin' })
export class AdminUser extends MyBaseEntity {
  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    type: String,
    minLength: 2,
    maxLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  @Column({ name: 'name', type: 'varchar', length: 10 })
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    type: String,
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column(() => UserPassword, { prefix: false })
  password: UserPassword;

  static async create(dto: { name: string; email: string; password: string }) {
    const user = new AdminUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await UserPassword.create(dto.password);

    const errors = validateSync(this);
    if (errors.length > 0) {
      const errorConstraints = errors.map((error) => {
        return error.constraints;
      });

      throw new Error(JSON.stringify(errorConstraints));
    }

    return user;
  }
}
