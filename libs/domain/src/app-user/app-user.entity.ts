import { Entity, OneToMany, OneToOne } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { ProductLike } from '@domain/product/product-like.entity';
import { User } from '@domain/user/user';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';

@Entity('user', { schema: 'app' })
export class AppUser extends User {
  @OneToOne(() => AppUserPoint, (userPoint) => userPoint.user, {
    cascade: true,
  })
  point: AppUserPoint;

  @OneToMany(() => AppUserAddress, (userAddress) => userAddress.user)
  addresses: AppUserAddress[];

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
