import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserCart } from '@domain/app-user/cart/user-cart.entity';
import {
  CreateUserCartDto,
  DeleteUserCartDto,
  UpdateUserCartDto,
} from '@domain/app-user/cart/user-cart.dto';
import { UserCartRepo } from './user-cart.repo';

@Injectable()
export class UserCartService {
  constructor(private readonly userCartRepo: UserCartRepo) {}

  async createUserCart(dto: CreateUserCartDto) {
    const userCart = new UserCart();
    userCart.userId = dto.userId;
    userCart.productId = dto.productId;
    userCart.count = dto.count;

    return await this.userCartRepo.save(userCart);
  }

  async getUserCarts(userId: number) {
    return await this.userCartRepo.findByUserId(userId);
  }

  async putUserCart(dto: UpdateUserCartDto) {
    const userCart = await this.userCartRepo.findOneById(dto.id);

    if (!userCart) {
      throw new NotFoundException(ERROR_MESSAGES.UserCartNotFound);
    }

    userCart.count = dto.count;

    return await this.userCartRepo.save(userCart);
  }

  async deleteUserCart(dto: DeleteUserCartDto) {
    return await this.userCartRepo.delete(dto.id);
  }
}
