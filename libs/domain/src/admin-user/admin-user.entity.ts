import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@common/entity/my-base-entity';

// TODO admin jwt 별도 발급시 admin domain 으로 이동 예정
@Entity('user', { schema: 'admin' })
export class AdminUser extends MyBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 10 })
  name: string;
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;
  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  @Column({ name: 'password', type: 'varchar', length: 20 })
  password: string;
}
