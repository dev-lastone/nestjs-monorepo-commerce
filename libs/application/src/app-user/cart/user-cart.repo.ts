import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCart } from '@domain/app-user/user-cart.entity';

@Injectable()
export class UserCartRepo {
  constructor(
    @InjectRepository(UserCart)
    private readonly userCartRepo: Repository<UserCart>,
  ) {}

  async save(userCart: UserCart) {
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
