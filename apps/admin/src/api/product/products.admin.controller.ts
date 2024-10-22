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
} from '@domain/product/product.dto';
import { ProductApplicationService } from '@application/product/product.application.service';

@ApiBearerAuth('jwt')
@ApiTags('products')
@Controller('products')
export class ProductsAdminController {
  constructor(
    private readonly productApplicationService: ProductApplicationService,
  ) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    type: Product,
  })
  postProduct(@Body() dto: CreateProductDto): Product {
    return this.productApplicationService.createProduct(dto);
  }

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: [Product],
  })
  getProducts(): Product[] {
    return this.productApplicationService.findProducts();
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
    return this.productApplicationService.updateProduct(id, {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
    });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    this.productApplicationService.deleteProduct(id);
  }
}
