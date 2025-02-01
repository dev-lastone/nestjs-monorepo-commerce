import { Controller, Delete, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from '@common/decorator/user-id.decorator';
import { ProductLikeService } from '../../../../application/product/like/product-like.service';

@ApiBearerAuth('jwt')
@ApiTags('product')
@Controller('products/:productId/like')
export class ProductLikeAppController {
  constructor(private readonly productLikeService: ProductLikeService) {}

  @Version('1')
  @Post()
  postProductLike(
    @UserId() userId: number,
    @Param('productId') productId: number,
  ) {
    return this.productLikeService.postProductLike({
      userId,
      productId,
    });
  }

  @Version('1')
  @Delete()
  deleteProductLike(
    @UserId() userId: number,
    @Param('productId') productId: number,
  ) {
    return this.productLikeService.deleteProductLike({
      userId,
      productId,
    });
  }
}
