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
import { ProductsAdminService } from './products.admin.service';
import {
  PostProductAdminRequestDto,
  PutProductAdminRequestDto,
} from './products.admin.dto';
import { Product } from '@domain/domain/product/product';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsAdminController {
  constructor(private readonly adminService: ProductsAdminService) {}

  @ApiBearerAuth('jwt')
  @Version('1')
  @Post()
  postProduct(@Body() dto: PostProductAdminRequestDto): Product {
    return this.adminService.postProduct(dto);
  }

  @ApiBearerAuth('jwt')
  @Version('1')
  @Get()
  getProducts(): Product[] {
    return this.adminService.getProducts();
  }

  @ApiBearerAuth('jwt')
  @Version('1')
  @Put(':id')
  putProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: PutProductAdminRequestDto,
  ): Product {
    return this.adminService.putProduct(id, dto);
  }

  @ApiBearerAuth('jwt')
  @Version('1')
  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    this.adminService.deleteProduct(id);
  }
}
