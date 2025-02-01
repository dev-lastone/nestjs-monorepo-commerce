import { Injectable } from '@nestjs/common';
import { ProductService } from '@application/product/product.service';
import { ProductsAdminRepo } from './products.admin.repo';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';

@Injectable()
export class ProductsAdminService {
  constructor(
    private readonly productService: ProductService,
    private readonly productsAdminRepo: ProductsAdminRepo,
  ) {}

  async postProduct(dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  async getProducts() {
    return await this.productsAdminRepo.find();
  }

  async putProduct(id: number, dto: UpdateProductDto) {
    return await this.productService.updateProduct(id, {
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
    });
  }

  async deleteProduct(id: number) {
    await this.productService.deleteProduct(id);
  }
}
