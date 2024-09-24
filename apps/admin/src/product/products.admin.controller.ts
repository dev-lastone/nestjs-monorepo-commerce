import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { Product } from '@domain/domain/product/product';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from '@domain/domain/product/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';

@ApiBearerAuth('jwt')
@ApiTags('products')
@Controller('products')
export class ProductsAdminController {
  constructor(private readonly productService: ProductService) {}

  @Version('1')
  @Post()
  postProduct(@Body() dto: CreateProductDto): Product {
    return this.productService.createProduct(dto);
  }

  @Version('1')
  @Get()
  getProducts(): Product[] {
    return this.productService.findProducts();
  }

  @Version('1')
  @Put(':id')
  putProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateProductDto,
  ): Product {
    return this.productService.updateProduct({
      id,
      name: dto.name,
      price: dto.price,
    });
  }

  @Version('1')
  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    this.productService.deleteProduct(id);
  }
}
