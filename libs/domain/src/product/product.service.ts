import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@domain/domain/product/product';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: '상품명',
      price: 10000,
      stock: 10,
    },
  ];

  findProducts(): Product[] {
    return this.products;
  }

  createProduct(dto: CreateProductDto): Product {
    const id = this.products.length + 1;

    const product = new Product({
      id,
      ...dto,
    });

    this.products.push(product);

    return product;
  }

  updateProduct(id: number, dto: UpdateProductDto): Product {
    const idx = this.checkExistentProduct(id);

    const product = this.products[idx];
    product.name = dto.name;
    product.price = dto.price;
    product.stock = dto.stock;

    this.products[idx] = product;

    return product;
  }

  deleteProduct(id: number) {
    this.checkExistentProduct(id);

    this.products = this.products.filter((product) => {
      return product.id !== id;
    });
  }

  checkExistentProduct(id: number): number {
    const idx = this.products.findIndex((product) => {
      return product.id === id;
    });

    if (idx === -1) {
      throw new NotFoundException(ERROR_MESSAGES.ProductNotFound);
    }

    return idx;
  }
}
