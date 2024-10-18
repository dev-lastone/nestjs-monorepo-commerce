import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { Product } from '@domain/product/product';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from '@domain/product/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/product.dto';

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
  postProduct(@Body() dto: CreateProductDto): Product {
    return this.productService.createProduct(dto);
  }

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: [Product],
  })
  getProducts(): Product[] {
    return this.productService.findProducts();
  }

  @Version('1')
  @Put(':id')
  @ApiOkResponse({
    type: Product,
  })
  putProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateProductDto,
  ): Product {
    return this.productService.updateProduct(id, {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
    });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    this.productService.deleteProduct(id);
  }
}
