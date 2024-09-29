import { Injectable } from '@nestjs/common';
import { UserCart } from '@domain/domain/app/user-cart';
import { PostUserCartsAppReqDto } from './user-carts.app.dto';

@Injectable()
export class UserCartsAppService {
  #userCarts: UserCart[] = [];

  postUserCart(userId: number, dto: PostUserCartsAppReqDto) {
    const userCart = new UserCart();
    userCart.userId = userId;
    userCart.id = this.#userCarts.length + 1;
    userCart.productId = dto.productId;
    userCart.count = dto.count;

    this.#userCarts.push(userCart);

    return userCart;
  }
}
