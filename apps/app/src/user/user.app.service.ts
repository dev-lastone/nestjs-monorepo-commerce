import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserAddress } from '@domain/domain/app/user-address';
import { PostUserAddressRequestDto } from './user.app.dto';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

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

  getUserAddresses(userId: number) {
    return this.#userAddresses.filter(
      (userAddress) => userAddress.userId === userId,
    );
  }

  putUserAddress(dto: UserAddress) {
    const userAddress = this.#userAddresses.find(
      (userAddress) => userAddress.id === dto.id,
    );

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    if (userAddress.userId !== dto.userId) {
      throw new ForbiddenException(ERROR_MESSAGES.UserAddressForbidden);
    }

    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    return userAddress;
  }
}
