import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserCart } from './user-cart';
import {
  CreateUserCartDto,
  DeleteUserCartDto,
  UpdateUserCartDto,
} from './user-cart.dto';
import { userCartStub } from './__stub/user-cart.stub';

@Injectable()
export class UserCartService {
  #userCarts: UserCart[] = [userCartStub];

  createUserCart(dto: CreateUserCartDto) {
    const userCart = new UserCart();
    userCart.userId = dto.userId;
    userCart.id = this.#userCarts.length + 1;
    userCart.productId = dto.productId;
    userCart.count = dto.count;

    this.#userCarts.push(userCart);

    return userCart;
  }

  getUserCarts(userId: number) {
    return this.#userCarts.filter((userCart) => userCart.userId === userId);
  }

  putUserCart(dto: UpdateUserCartDto) {
    const userCart = this.#userCarts.find(
      (userCart) => userCart.id === dto.id && userCart.userId === dto.userId,
    );

    if (!userCart) {
      throw new NotFoundException(ERROR_MESSAGES.UserCartNotFound);
    }

    userCart.count = dto.count;

    return userCart;
  }

  deleteUserCart(dto: DeleteUserCartDto) {
    this.#userCarts = this.#userCarts.filter(
      (userCart) => userCart.userId !== dto.userId || userCart.id !== dto.id,
    );
  }
}
