import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddress, UsersAddresses } from '@domain/domain/app/user-address';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { PostUserAddressRequestDto } from './user-addresses.app.dto';

@Injectable()
export class UserAddressesAppService {
  #usersAddresses = UsersAddresses.of();

  postUserAddress(userId: number, dto: PostUserAddressRequestDto) {
    /*
      TODO
      isDefault 1개만 가능하도록
      데이터가 있을 경우 isDefault 1개 무조건 유지
      maxLength 10
    */

    const userAddresses = this.#usersAddresses.get(userId)
      ? this.#usersAddresses.get(userId)
      : new Map<number, UserAddress>();

    const userAddress = new UserAddress();
    userAddress.id =
      userAddresses.size === 0
        ? 1
        : Math.max(...Array.from(userAddresses).map((item) => item[1].id)) + 1;
    userAddress.userId = userId;
    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    userAddresses.set(userAddress.id, userAddress);

    return userAddress;
  }

  getUserAddresses(userId: number) {
    return Array.from(this.#usersAddresses.get(userId)).map((item) => item[1]);
  }

  putUserAddress(dto: UserAddress) {
    const userAddresses = this.#usersAddresses.get(dto.userId);

    if (!userAddresses) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    const userAddress = userAddresses.get(dto.id);

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    userAddresses.set(userAddress.id, userAddress);

    return userAddress;
  }

  deleteUserAddress(userId: number, id: number) {
    const userAddresses = this.#usersAddresses.get(userId);

    if (!userAddresses.has(id)) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    userAddresses.delete(id);
  }
}
