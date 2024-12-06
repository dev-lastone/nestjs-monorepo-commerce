import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { Product } from '@domain/product/product.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ProductService } from '@application/product/product.service';

@ApiBearerAuth('jwt')
@ApiTags('products')
@Controller('products')
export class ProductsAdminController {
  constructor(private readonly productService: ProductService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: Product,
  })
  async postProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: [Product],
  })
  async getProducts() {
    return await this.productService.findProducts();
  }

  @Version('1')
  @Put(':id')
  @ApiOkResponse({
    type: Product,
  })
  async putProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(id, {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
    });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
  }
}
