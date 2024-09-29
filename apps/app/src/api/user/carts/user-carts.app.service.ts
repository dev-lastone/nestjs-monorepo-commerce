import { Injectable, NotFoundException } from '@nestjs/common';
import { PostUserCartsAppReqDto } from './user-carts.app.dto';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserCart } from '../../../domain/user/cart/user-cart';

@Injectable()
export class UserCartsAppService {
  #userCarts: UserCart[] = [
    {
      userId: 1,
      id: 1,
      productId: 1,
      count: 1,
    },
  ];

  postUserCart(userId: number, dto: PostUserCartsAppReqDto) {
    const userCart = new UserCart();
    userCart.userId = userId;
    userCart.id = this.#userCarts.length + 1;
    userCart.productId = dto.productId;
    userCart.count = dto.count;

    this.#userCarts.push(userCart);

    return userCart;
  }

  getUserCarts(userId: number) {
    return this.#userCarts.filter((userCart) => userCart.userId === userId);
  }

  // TODO dto domain 정의
  putUserCart(dto: { userId: number; id: number; count: number }) {
    const userCart = this.#userCarts.find(
      (userCart) => userCart.id === dto.id && userCart.userId === dto.userId,
    );

    if (!userCart) {
      throw new NotFoundException(ERROR_MESSAGES.UserCartNotFound);
    }

    userCart.count = dto.count;

    return userCart;
  }

  deleteUserCart(dto: { userId: number; id: number }) {
    this.#userCarts = this.#userCarts.filter(
      (userCart) => userCart.userId !== dto.userId || userCart.id !== dto.id,
    );
  }
}
