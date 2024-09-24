import { Injectable } from '@nestjs/common';
import { Product } from '@domain/domain/product/product';

@Injectable()
export class ProductsAppService {
  private products: Product[] = [
    {
      id: 1,
      name: 'test1',
      price: 10000,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
