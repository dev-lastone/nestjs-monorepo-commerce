import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductLikeAppDto } from './product-like.app.dto';
import { ProductService } from '@domain/product/product.service';

@Injectable()
export class ProductLikeAppService {
  #productLikes: ProductLikeAppDto[] = [
    {
      productId: 1,
      userId: 1,
    },
  ];

  constructor(private readonly productService: ProductService) {}

  postProductLike(dto: ProductLikeAppDto) {
    this.productService.checkExistentProduct(dto.productId);

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
    this.productService.checkExistentProduct(dto.productId);

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
