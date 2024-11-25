import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLike } from '@domain/product/like/product-like.entity';

@Injectable()
export class ProductLikeRepo {
  constructor(
    @InjectRepository(ProductLike)
    private readonly productLikeRepo: Repository<ProductLike>,
  ) {}

  async save(productLike: ProductLike) {
    return await this.productLikeRepo.save(productLike);
  }

  async delete(id: number) {
    return await this.productLikeRepo.delete(id);
  }

  async findOne(partial: Partial<ProductLike>) {
    return await this.productLikeRepo.findOne({
      where: {
        ...partial,
      },
    });
  }
}
