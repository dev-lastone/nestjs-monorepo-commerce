import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductLikeAppDto } from './product-like.app.dto';
import { ProductService } from '@application/product/product.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductLikeRepo } from '@application/product/like/product-like.repo';
import { ProductLike } from '@domain/product/product-like.entity';

@Injectable()
export class ProductLikeAppService {
  constructor(
    private readonly productLikeRepo: ProductLikeRepo,
    private readonly productService: ProductService,
  ) {}

  async postProductLike(dto: ProductLikeAppDto) {
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

  async deleteProductLike(dto: ProductLikeAppDto) {
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
