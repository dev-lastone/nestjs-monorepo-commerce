import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductLikeAppDto } from './product-like.app.dto';
import { ProductApplicationService } from '@application/product/product.application.service';
import { ProductLikeRepo } from '../../../domain/product/like/product-like.repo';
import { ProductLike } from '../../../domain/product/like/product-like.entity';

@Injectable()
export class ProductLikeAppService {
  constructor(
    private readonly productLikeRepo: ProductLikeRepo,
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  async postProductLike(dto: ProductLikeAppDto) {
    await this.productApplicationService.checkExistentProduct(dto.productId);

    const productLike = await this.productLikeRepo.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (productLike) {
      throw new BadRequestException('Product already liked');
    }

    await this.productLikeRepo.save(ProductLike.create(dto));

    return true;
  }

  async deleteProductLike(dto: ProductLikeAppDto) {
    await this.productApplicationService.checkExistentProduct(dto.productId);

    const productLike = await this.productLikeRepo.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (!productLike) {
      throw new BadRequestException('Product not liked');
    }

    await this.productLikeRepo.delete(productLike.id);

    return false;
  }
}
