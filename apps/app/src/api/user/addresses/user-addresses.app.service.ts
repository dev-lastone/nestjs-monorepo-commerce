import { Injectable } from '@nestjs/common';
import { UserAddressRequestDto } from '../../../application/user/address/user-address.dto';
import { UserAddressService } from '../../../application/user/address/user-address.service';

@Injectable()
export class UserAddressesAppService {
  constructor(private readonly userAddressService: UserAddressService) {}

  async postUserAddress(dto: { userId: bigint } & UserAddressRequestDto) {
    return await this.userAddressService.createUserAddress(dto);
  }

  async getUserAddresses(userId: bigint) {
    return await this.userAddressService.getUserAddresses(userId);
  }

  async putUserAddress(
    dto: {
      id: bigint;
      userId: bigint;
    } & UserAddressRequestDto,
  ) {
    return await this.userAddressService.updateUserAddress(dto);
  }

  async deleteUserAddress(dto: { id: bigint; userId: bigint }) {
    await this.userAddressService.deleteUserAddress(dto);
  }
}
