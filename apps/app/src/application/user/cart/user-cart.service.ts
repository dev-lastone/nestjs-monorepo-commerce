import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import {
  DeleteUserCartDto,
  UpdateUserCartDto,
} from '@domain/app-user/dto/user-cart.dto';
import { UserCartRepo } from './user-cart.repo';
import { ProductService } from '@application/product/product.service';
import { PostUserCartsAppReqDto } from '../../../api/user/carts/user-carts.app.dto';

@Injectable()
export class UserCartService {
  constructor(
    private readonly productService: ProductService,
    private readonly userCartRepo: UserCartRepo,
  ) {}

  async createUserCart(userId: number, dto: PostUserCartsAppReqDto) {
    // TODO 재고 확인
    const product = await this.productService.findOneProduct(dto.productId);
    // TODO 이미 담았는지 확인

    const userCart = AppUserCart.create({ userId, ...dto, product });

    return await this.userCartRepo.save(userCart);
  }

  async getUserCarts(userId: number) {
    return await this.userCartRepo.findByUserId(userId);
  }

  async putUserCart(dto: UpdateUserCartDto) {
    // TODO 재고 확인
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
