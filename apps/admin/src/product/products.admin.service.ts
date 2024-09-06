import { Injectable } from '@nestjs/common';
import { PostProductAdminRequestDto } from './products.admin.dto';
import { Product } from '@domain/domain/product/product';

@Injectable()
export class ProductsAdminService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'test1',
      price: 10000,
    },
  ];

  postProduct(dto: PostProductAdminRequestDto): Product {
    const { name, price } = dto;

    const id = this.products.length + 1;

    const product = new Product({
      id,
      name,
      price,
    });

    this.products.push(product);

    return product;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
