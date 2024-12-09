import { Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { UserAddress } from '@domain/app-user/user-address.entity';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { User } from '@domain/_vo/user';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { ProductLike } from '@domain/product/product-like.entity';

@Entity('user', { schema: 'app' })
export class AppUser extends User {
  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];

  @OneToMany(() => AppUserCart, (userCart) => userCart.user)
  carts: AppUserCart[];

  @OneToMany(() => ProductLike, (productLike) => productLike.user)
  productLikes: ProductLike[];

  static async create(dto: CreateUserDto) {
    const appUser = new AppUser();
    Object.assign(appUser, await User.create(dto));
    appUser.point = AppUserPoint.create();
    return appUser;
  }
}
