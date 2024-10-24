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
  async postProduct(@Body() dto: CreateProductDto) {
    return await this.productApplicationService.createProduct(dto);
  }

  @Version('1')
  @Get()
  @ApiOkResponse({
    type: [Product],
  })
  async getProducts() {
    return await this.productApplicationService.findProducts();
  }

  @Version('1')
  @Put(':id')
  @ApiOkResponse({
    type: Product,
  })
  async putProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return await this.productApplicationService.updateProduct(id, {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
    });
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    await this.productApplicationService.deleteProduct(id);
  }
}
