import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@domain/domain/product/product';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductRepo } from '@domain/domain/product/product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  findProducts(): Product[] {
    return this.productRepo.find();
  }

  findOneProduct(id: number): Product {
    return this.checkExistentProduct(id);
  }

  createProduct(dto: CreateProductDto): Product {
    const product = new Product({
      ...dto,
    });

    return this.productRepo.save(product);
  }

  updateProduct(id: number, dto: UpdateProductDto): Product {
    const product = this.checkExistentProduct(id);

    product.name = dto.name;
    product.price = dto.price;
    product.stock = dto.stock;

    this.productRepo.save(product);

    return product;
  }

  deleteProduct(id: number) {
    this.checkExistentProduct(id);

    this.productRepo.delete(id);
  }

  checkExistentProduct(id: number): Product {
    const product = this.productRepo.findOneById(id);

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.ProductNotFound);
    }

    return product;
  }
}
