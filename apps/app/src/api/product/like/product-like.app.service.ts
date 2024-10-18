import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductLikeAppDto } from './product-like.app.dto';
import { ProductApplicationService } from '@application/product/product.application.service';

@Injectable()
export class ProductLikeAppService {
  #productLikes: ProductLikeAppDto[] = [
    {
      productId: 1,
      userId: 1,
    },
  ];

  constructor(
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  postProductLike(dto: ProductLikeAppDto) {
    this.productApplicationService.checkExistentProduct(dto.productId);

    const productLike = this.#productLikes.find((productLike) => {
      return (
        productLike.productId === dto.productId &&
        productLike.userId === dto.userId
      );
    });

    if (productLike) {
      throw new BadRequestException('Product already liked');
    }

    this.#productLikes.push(dto);

    return true;
  }

  deleteProductLike(dto: ProductLikeAppDto) {
    this.productApplicationService.checkExistentProduct(dto.productId);

    const productLikeIndex = this.#productLikes.findIndex((productLike) => {
      return (
        productLike.productId === dto.productId &&
        productLike.userId === dto.userId
      );
    });

    if (productLikeIndex === -1) {
      throw new BadRequestException('Product not liked');
    }

    this.#productLikes.splice(productLikeIndex, 1);

    return false;
  }
}
