import { Injectable } from '@nestjs/common';
import { Product } from '@domain/domain/product/product';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'test1',
      price: 10000,
    },
  ];

  findProducts(): Product[] {
    return this.products;
  }
}
