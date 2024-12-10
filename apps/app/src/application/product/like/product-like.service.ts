import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '@application/product/product.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductLike } from '@domain/product/product-like.entity';
import { ProductLikeRepo } from './product-like.repo';
import { ProductLikeDto } from './product-like.dto';

@Injectable()
export class ProductLikeService {
  constructor(
    private readonly productLikeRepo: ProductLikeRepo,
    private readonly productService: ProductService,
  ) {}

  async postProductLike(dto: ProductLikeDto) {
    await this.productService.checkExistentProduct(dto.productId);

    const productLike = await this.productLikeRepo.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (productLike) {
      throw new BadRequestException(ERROR_MESSAGES.ProductAlreadyLiked);
    }

    await this.productLikeRepo.save(ProductLike.create(dto));

    return true;
  }

  async deleteProductLike(dto: ProductLikeDto) {
    await this.productService.checkExistentProduct(dto.productId);

    const productLike = await this.productLikeRepo.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (!productLike) {
      throw new BadRequestException(ERROR_MESSAGES.ProductNotLiked);
    }

    await this.productLikeRepo.delete(productLike.id);

    return false;
  }
}
