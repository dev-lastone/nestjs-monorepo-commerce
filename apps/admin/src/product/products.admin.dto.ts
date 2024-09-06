import { PickType } from '@nestjs/swagger';
import { Product } from '@domain/domain/product/product';

export class PostProductAdminRequestDto extends PickType(Product, [
  'name',
  'price',
]) {}
