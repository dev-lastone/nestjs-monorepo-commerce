import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorator/public.decorator';
import { ProductsAppRepo } from './products.app.repo';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(private readonly productsAppRepo: ProductsAppRepo) {}

  @Public()
  @Version('1')
  @Get()
  async getProducts() {
    return await this.productsAppRepo.find();
  }
}
