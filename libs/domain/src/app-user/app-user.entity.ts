import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { compareSync } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserAddress } from '@domain/app-user/address/user-address.entity';
import { UserCart } from '@domain/app-user/cart/user-cart.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';
import { UserPassword } from '@domain/_vo/user-password';

@Entity('user', { schema: 'app' })
export class AppUser extends MyBaseEntity {
  // TODO @Column 말고 다른 방법으로 해결할 수 있는지 고민 transformer?
  @Column(() => UserName, { prefix: false })
  name: UserName;

  @ApiProperty()
  @Column(() => Email, { prefix: false })
  email: Email;

  @ApiProperty()
  @Column(() => UserPassword, { prefix: false })
  password: UserPassword;

  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => UserCart, (userCart) => userCart.user)
  carts: UserCart[];

  static async create(dto: {
    name: UserName;
    email: Email;
    password: UserPassword;
  }) {
    const user = new AppUser();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.point = AppUserPoint.create();
    return user;
  }

  async compare(password: UserPassword) {
    const isPasswordValid = await compareSync(
      password.getValue(),
      this.password.getValue(),
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn);
    }
  }
}
