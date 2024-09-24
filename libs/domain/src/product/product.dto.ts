import { PickType } from '@nestjs/swagger';
import { Product } from '@domain/domain/product/product';

export class CreateProductDto extends PickType(Product, ['name', 'price']) {}

export class UpdateProductDto extends PickType(Product, [
  'id',
  'name',
  'price',
]) {}
