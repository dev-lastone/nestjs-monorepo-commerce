import { Injectable } from '@nestjs/common';
import { ProductsAppRepo } from './products.app.repo';

@Injectable()
export class ProductsAppService {
  constructor(private readonly productsAppRepo: ProductsAppRepo) {}

  async getProducts() {
    return await this.productsAppRepo.find();
  }
}
