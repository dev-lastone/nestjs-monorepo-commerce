import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { ProductService } from '@application/product/product.service';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Version('1')
  @Get()
  async getProducts() {
    return await this.productService.findProducts();
  }
}
