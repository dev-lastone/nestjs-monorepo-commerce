import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { ProductApplicationService } from '@application/product/product.application.service';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  @Public()
  @Version('1')
  @Get()
  async getProducts() {
    return await this.productApplicationService.findProducts();
  }
}
