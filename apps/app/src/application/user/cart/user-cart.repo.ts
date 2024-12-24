import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';

@Injectable()
export class UserCartRepo {
  constructor(
    @InjectRepository(AppUserCart)
    private readonly userCartRepo: Repository<AppUserCart>,
  ) {}

  async save(userCart: AppUserCart) {
    return await this.userCartRepo.save(userCart);
  }

  async delete(userCart: AppUserCart) {
    return await this.userCartRepo.delete(userCart);
  }

  async findByUserId(userId: bigint) {
    return await this.userCartRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOneById(id: bigint) {
    return await this.userCartRepo.findOne({
      where: {
        id,
      },
    });
  }
}
