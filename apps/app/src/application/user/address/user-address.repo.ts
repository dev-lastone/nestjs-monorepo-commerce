import { Injectable } from '@nestjs/common';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressRepo {
  constructor(
    @InjectRepository(AppUserAddress)
    private readonly userAddressRepo: Repository<AppUserAddress>,
  ) {}

  async save(userAddress: AppUserAddress) {
    return await this.userAddressRepo.save(userAddress);
  }

  async delete(userAddress: AppUserAddress) {
    return await this.userAddressRepo.delete(userAddress);
  }

  async findByUserId(userId: bigint) {
    return await this.userAddressRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOneById(id: bigint) {
    return await this.userAddressRepo.findOne({
      where: {
        id,
      },
    });
  }
}
