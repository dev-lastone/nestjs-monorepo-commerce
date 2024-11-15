import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserAddress } from '@domain/app-user/address/user-address.entity';
import { UserCart } from '@domain/app-user/cart/user-cart.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';

@Entity('user', { schema: 'app' })
export class AppUser extends MyBaseEntity {
  @ApiProperty()
  @Column(() => UserName, { prefix: false })
  name: UserName;

  @ApiProperty()
  @Column(() => Email, { prefix: false })
  email: Email;

  @ApiProperty({ default: 'string1234' })
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

  static async create(dto: { name: UserName; email: Email; password: string }) {
    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = await this.setPassword(dto.password);
    user.point = AppUserPoint.create(user);
    return user;
  }

  private static async setPassword(password: string) {
    if (password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long',
      );
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
