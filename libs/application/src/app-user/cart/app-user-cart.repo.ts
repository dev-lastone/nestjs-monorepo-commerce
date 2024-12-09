import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';

@Injectable()
export class AppUserCartRepo {
  constructor(
    @InjectRepository(AppUserCart)
    private readonly userCartRepo: Repository<AppUserCart>,
  ) {}

  async save(userCart: AppUserCart) {
    return await this.userCartRepo.save(userCart);
  }

  async delete(id: number) {
    return await this.userCartRepo.delete(id);
  }

  async findByUserId(userId: number) {
    return await this.userCartRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOneById(id: number) {
    return await this.userCartRepo.findOne({
      where: {
        id,
      },
    });
  }
}
