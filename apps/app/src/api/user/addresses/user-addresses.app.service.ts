import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { PostUserAddressRequestDto } from './user-addresses.app.dto';
import { USER_ADDRESS_MAX_LENGTH } from '@common/common/constant/constants';
import { UserAddress } from '../../../domain/user/address/user-address';
import { UserAddressRepo } from '../../../domain/user/address/user-address.repo';

@Injectable()
export class UserAddressesAppService {
  constructor(private readonly userAddressRepo: UserAddressRepo) {}

  postUserAddress(userId: number, dto: PostUserAddressRequestDto) {
    const userAddresses = this.userAddressRepo.findByUserId(userId);

    if (userAddresses.length >= USER_ADDRESS_MAX_LENGTH) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressMaxLength);
    }

    if (dto.isDefault) {
      userAddresses.forEach((userAddress) => {
        userAddress.isDefault = false;
      });
    } else {
      if (!userAddresses.some((userAddress) => userAddress.isDefault)) {
        throw new BadRequestException(
          ERROR_MESSAGES.UserAddressDefaultRequired,
        );
      }
    }

    const userAddress = new UserAddress({
      userId,
      ...dto,
    });

    this.userAddressRepo.save(userAddress);

    return userAddress;
  }

  getUserAddresses(userId: number) {
    return this.userAddressRepo.findByUserId(userId);
  }

  putUserAddress(dto: UserAddress) {
    const userAddress = this.userAddressRepo.findOneById(dto.id);

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    userAddress.zipcode = dto.zipcode;
    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    this.userAddressRepo.save(userAddress);

    return userAddress;
  }

  deleteUserAddress(userId: number, id: number) {
    const userAddress = this.userAddressRepo.findOneById(id);

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    this.userAddressRepo.delete(id);
  }
}
