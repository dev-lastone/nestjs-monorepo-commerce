import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PostProductAdminRequestDto,
  PutProductAdminRequestDto,
} from './products.admin.dto';
import { Product } from '@domain/domain/product/product';

@Injectable()
export class ProductsAdminService {
  private products: Product[] = [
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

  putProduct(id: number, dto: PutProductAdminRequestDto): Product {
    const { name, price } = dto;

    const idx = this.#checkProductExist(id);

    const product = this.products[idx];
    product.name = name;
    product.price = price;

    this.products[idx] = product;

    return product;
  }

  deleteProduct(id: number) {
    this.#checkProductExist(id);

    this.products = this.products.filter((product) => {
      return product.id !== id;
    });
  }

  #checkProductExist(id: number): number {
    const idx = this.products.findIndex((product) => {
      return product.id === id;
    });

    if (idx === -1) {
      throw new NotFoundException();
    }

    return idx;
  }
}
