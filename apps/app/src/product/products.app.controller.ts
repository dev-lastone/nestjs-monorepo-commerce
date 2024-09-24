import { Controller, Get, Version } from '@nestjs/common';
import { ProductsAppService } from './products.app.service';
import { Product } from '@domain/domain/product/product';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(private readonly productsAppService: ProductsAppService) {}

  @Version('1')
  @Get()
  getProducts(): Product[] {
    return this.productsAppService.getProducts();
  }
}
