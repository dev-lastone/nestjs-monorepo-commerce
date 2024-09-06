import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { ProductsAdminService } from './products.admin.service';
import { PostProductAdminRequestDto } from './products.admin.dto';
import { Product } from '@domain/domain/product/product';

@Controller('products')
export class ProductsAdminController {
  constructor(private readonly adminService: ProductsAdminService) {}

  @Version('1')
  @Post()
  postProduct(@Body() dto: PostProductAdminRequestDto): Product {
    return this.adminService.postProduct(dto);
  }

  @Version('1')
  @Get()
  getProducts(): Product[] {
    return this.adminService.getProducts();
  }
}
