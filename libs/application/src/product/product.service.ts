import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@domain/product/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/dto/product.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductRepo } from '@application/product/product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  async findProducts() {
    return await this.productRepo.find();
  }

  async findOneProduct(id: number) {
    return await this.checkExistentProduct(id);
  }

  async createProduct(dto: CreateProductDto) {
    const product = Product.create({
      ...dto,
    });

    return await this.productRepo.save(product);
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    const product = await this.checkExistentProduct(id);

    product.name = dto.name;
    product.price = dto.price;
    product.stock = dto.stock;

    await this.productRepo.save(product);

    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.checkExistentProduct(id);

    await this.productRepo.delete(product);
  }

  async checkExistentProduct(id: number) {
    const product = await this.productRepo.findOneById(id);

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.ProductNotFound);
    }

    return product;
  }
}
