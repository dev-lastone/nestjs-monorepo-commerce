import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
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
}
