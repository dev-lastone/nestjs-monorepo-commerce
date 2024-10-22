import { PickType } from '@nestjs/swagger';
import { Product } from '@domain/product/product.entity';

export class CreateProductDto extends PickType(Product, [
  'name',
  'price',
  'stock',
]) {}

export class UpdateProductDto extends PickType(Product, [
  'name',
  'price',
  'stock',
]) {}
