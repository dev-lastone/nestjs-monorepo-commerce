import { Injectable } from '@nestjs/common';
import { UserAddress } from '@domain/domain/app/user-address';
import { PostUserAddressRequestDto } from './user.app.dto';

@Injectable()
export class UserAppService {
  #userAddresses: UserAddress[] = [
    {
      id: 1,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      isDefault: true,
    },
  ];

  postUserAddress(userId: number, dto: PostUserAddressRequestDto) {
    const userAddress = new UserAddress();
    userAddress.id = this.#userAddresses.length + 1;
    userAddress.userId = userId;
    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    this.#userAddresses.push(userAddress);

    return userAddress;
  }
}
