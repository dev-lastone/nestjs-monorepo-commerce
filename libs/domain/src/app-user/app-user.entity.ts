import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddress } from '../../../../apps/app/src/domain/user/address/user-address.entity';
import { UserCart } from '../../../../apps/app/src/domain/user/cart/user-cart.entity';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

@Entity('user', { schema: 'app' })
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: '홍길동' })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;

  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  password: string;

  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => UserCart, (userCart) => userCart.user)
  carts: UserCart[];

  static async create(dto: { name: string; email: string; password: string }) {
    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await this.setPassword(dto.password);
    user.point = AppUserPoint.create(user);
    return user;
  }

  private static async setPassword(password: string) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    // TODO 최대값
    // TODO 특문 조합 룰 추가
    return await this.hashPassword(password);
  }

  private static async hashPassword(password: string) {
    const salt = await genSaltSync();
    return await hashSync(password, salt);
  }

  async compare(password: string) {
    const isPasswordValid = await compareSync(password, this.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }
  }
}
