import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { UserAddress } from '@domain/app-user/user-address.entity';
import { UserCart } from '@domain/app-user/cart/user-cart.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { User } from '@domain/_vo/user';
import { CreateUserDto } from '@domain/_dto/create-user.dto';

@Entity('user', { schema: 'app' })
export class AppUser extends MyBaseEntity {
  @Column(() => User, { prefix: false })
  user: User;

  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => UserCart, (userCart) => userCart.user)
  carts: UserCart[];

  static async create(dto: CreateUserDto) {
    const appUser = new AppUser();
    appUser.user = await User.create(dto);
    appUser.point = AppUserPoint.create();
    return appUser;
  }
}
