import { Injectable } from '@nestjs/common';
import { Product } from '@domain/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepo {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async find() {
    return await this.productRepo.find();
  }

  async findOneById(id: bigint) {
    return await this.productRepo.findOne({
      where: {
        id,
      },
    });
  }

  async save(product: Product) {
    return await this.productRepo.save(product);
  }

  async delete(product: Product) {
    return await this.productRepo.remove(product);
  }
}
