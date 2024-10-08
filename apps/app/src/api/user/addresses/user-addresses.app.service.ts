import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { PostUserAddressRequestDto } from './user-addresses.app.dto';
import { USER_ADDRESS_MAX_LENGTH } from '@common/common/constant/constants';
import {
  UserAddress,
  UsersAddresses,
} from '../../../domain/user/address/user-address';

@Injectable()
export class UserAddressesAppService {
  #usersAddresses = UsersAddresses.of();

  postUserAddress(userId: number, dto: PostUserAddressRequestDto) {
    const userAddresses = this.#usersAddresses.get(userId)
      ? this.#usersAddresses.get(userId)
      : new Map<number, UserAddress>();

    if (userAddresses.size >= USER_ADDRESS_MAX_LENGTH) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressMaxLength);
    }

    if (dto.isDefault) {
      userAddresses.forEach((userAddress) => {
        userAddress.isDefault = false;
      });
    } else {
      const userAddressesArray = Array.from(userAddresses.values());
      if (!userAddressesArray.some((userAddress) => userAddress.isDefault)) {
        throw new BadRequestException(
          ERROR_MESSAGES.UserAddressDefaultRequired,
        );
      }
    }

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
