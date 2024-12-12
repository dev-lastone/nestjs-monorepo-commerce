import { Injectable } from '@nestjs/common';
import { UserAddressRequestDto } from '../../../application/user/address/user-address.dto';
import { UserAddressService } from '../../../application/user/address/user-address.service';

@Injectable()
export class UserAddressesAppService {
  constructor(private readonly userAddressService: UserAddressService) {}

  async postUserAddress(dto: { userId: number } & UserAddressRequestDto) {
    return await this.userAddressService.createUserAddress(dto);
  }

  async getUserAddresses(userId: number) {
    return await this.userAddressService.getUserAddresses(userId);
  }

  async putUserAddress(
    dto: {
      id: number;
      userId: number;
    } & UserAddressRequestDto,
  ) {
    return await this.userAddressService.updateUserAddress(dto);
  }

  async deleteUserAddress(dto: { id: number; userId: number }) {
    await this.userAddressService.deleteUserAddress(dto);
  }
}
