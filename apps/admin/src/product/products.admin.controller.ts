import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ProductsAdminService } from './products.admin.service';
import {
  PostProductAdminRequestDto,
  PutProductAdminRequestDto,
} from './products.admin.dto';
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

  @Version('1')
  @Put(':id')
  putProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PutProductAdminRequestDto,
  ): Product {
    return this.adminService.putProduct(id, dto);
  }
}