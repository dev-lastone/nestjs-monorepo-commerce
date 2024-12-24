import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import {
  CreateUserCartDto,
  DeleteUserCartDto,
  UpdateUserCartDto,
} from '@domain/app-user/dto/user-cart.dto';
import { UserCartRepo } from './user-cart.repo';

@Injectable()
export class UserCartService {
  constructor(private readonly userCartRepo: UserCartRepo) {}

  async createUserCart(dto: CreateUserCartDto) {
    const userCart = await AppUserCart.create(dto);

    return await this.userCartRepo.save(userCart);
  }

  async getUserCarts(userId: bigint) {
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
    const userCart = await this.userCartRepo.findOneById(dto.id);

    if (!userCart) {
      throw new NotFoundException(ERROR_MESSAGES.UserCartNotFound);
    }

    return await this.userCartRepo.delete(userCart);
  }
}
