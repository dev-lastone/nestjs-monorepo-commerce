import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductLikeAppDto } from './product-like.app.dto';
import { ProductService } from '@domain/domain/product/product.service';

@Injectable()
export class ProductLikeAppService {
  #productLikes: ProductLikeAppDto[] = [
    {
      productId: 1,
      userId: 1,
    },
  ];

  constructor(private readonly productService: ProductService) {}

  productLike(dto: ProductLikeAppDto) {
    this.productService.checkProductExist(dto.productId);

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
}
