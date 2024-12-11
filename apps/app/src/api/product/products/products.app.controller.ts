import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { ProductsAppService } from './products.app.service';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(private readonly productsAppService: ProductsAppService) {}

  @Public()
  @Version('1')
  @Get()
  async getProducts() {
    return await this.productsAppService.getProducts();
  }
}
