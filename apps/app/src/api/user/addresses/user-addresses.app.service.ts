import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import {
  PostUserAddressRequestDto,
  PutUserAddressRequestDto,
} from './user-addresses.app.dto';
import { USER_ADDRESS_MAX_LENGTH } from '@common/constant/constants';
import { UserAddress } from '../../../domain/user/address/user-address.entity';
import { UserAddressRepo } from '../../../domain/user/address/user-address.repo';

@Injectable()
export class UserAddressesAppService {
  constructor(private readonly userAddressRepo: UserAddressRepo) {}

  async postUserAddress(userId: number, dto: PostUserAddressRequestDto) {
    const userAddresses = await this.userAddressRepo.findByUserId(userId);

    if (userAddresses?.length >= USER_ADDRESS_MAX_LENGTH) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressMaxLength);
    }

    if (dto.isDefault) {
      userAddresses?.forEach((userAddress) => {
        userAddress.isDefault = false;
      });
    } else {
      if (!userAddresses?.some((userAddress) => userAddress.isDefault)) {
        throw new BadRequestException(
          ERROR_MESSAGES.UserAddressDefaultRequired,
        );
      }
    }

    const userAddress = UserAddress.create({
      userId,
      ...dto,
    });

    return await this.userAddressRepo.save(userAddress);
  }

  async getUserAddresses(userId: number) {
    return await this.userAddressRepo.findByUserId(userId);
  }

  async putUserAddress(
    id: number,
    userId: number,
    dto: PutUserAddressRequestDto,
  ) {
    const userAddress = await this.userAddressRepo.findOneById(id);

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    userAddress.address = dto.address;
    userAddress.isDefault = dto.isDefault;

    return await this.userAddressRepo.save(userAddress);
  }

  async deleteUserAddress(userId: number, id: number) {
    const userAddress = await this.userAddressRepo.findOneById(id);

    if (!userAddress) {
      throw new NotFoundException(ERROR_MESSAGES.UserAddressNotFound);
    }

    if (userAddress.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.userAddressRepo.delete(id);
  }
}
