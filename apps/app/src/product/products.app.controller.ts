import { Controller, Get, Version } from '@nestjs/common';
import { Product } from '@domain/domain/product/product';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '@domain/domain/product/product.service';
import { Public } from '@common/common/decorator/public.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsAppController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Version('1')
  @Get()
  getProducts(): Product[] {
    return this.productService.findProducts();
  }
}
