import { Injectable } from '@nestjs/common';
import { UserAddress } from '@domain/app-user/user-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressRepo {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepo: Repository<UserAddress>,
  ) {}

  async save(userAddress: UserAddress) {
    return await this.userAddressRepo.save(userAddress);
  }

  async delete(id: number) {
    return await this.userAddressRepo.delete(id);
  }

  async findByUserId(userId: number) {
    return await this.userAddressRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOneById(id: number) {
    return await this.userAddressRepo.findOne({
      where: {
        id,
      },
    });
  }
}
