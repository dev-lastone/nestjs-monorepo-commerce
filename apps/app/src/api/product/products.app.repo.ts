import { Injectable } from '@nestjs/common';
import { Product } from '@domain/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsAppRepo {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async find() {
    return await this.productRepo.find();
  }
}
