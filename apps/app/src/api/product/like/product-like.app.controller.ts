import { Controller, Delete, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductLikeAppService } from './product-like.app.service';
import { UserId } from '@common/decorator/user-id.decorator';

@ApiBearerAuth('jwt')
@ApiTags('product')
@Controller('products/:productId/like')
export class ProductLikeAppController {
  constructor(private readonly productLikeAppService: ProductLikeAppService) {}

  @Version('1')
  @Post()
  postProductLike(
    @UserId() userId: number,
    @Param('productId') productId: number,
  ) {
    return this.productLikeAppService.postProductLike({
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
    return this.productLikeAppService.deleteProductLike({
      userId,
      productId,
    });
  }
}
