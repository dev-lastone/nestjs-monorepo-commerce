import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductLikeAppService } from './product-like.app.service';

@ApiBearerAuth('jwt')
@ApiTags('product')
@Controller('products/:productId/like')
export class ProductLikeAppController {
  constructor(private readonly productLikeAppService: ProductLikeAppService) {}

  @Version('1')
  @Post()
  postProductLike(
    @Req() req,
    @Param('productId', new ParseIntPipe()) productId: number,
  ) {
    return this.productLikeAppService.postProductLike({
      userId: req.user.sub,
      productId,
    });
  }

  @Version('1')
  @Delete()
  deleteProductLike(
    @Req() req,
    @Param('productId', new ParseIntPipe()) productId: number,
  ) {
    return this.productLikeAppService.deleteProductLike({
      userId: req.user.sub,
      productId,
    });
  }
}
