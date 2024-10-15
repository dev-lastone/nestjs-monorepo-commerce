import { Injectable } from '@nestjs/common';
import { UserAddress } from './user-address';
import { userAddressStub } from './__stub/user-address.stub';

@Injectable()
export class UserAddressRepo {
  #userAddresses: UserAddress[] = [{ ...userAddressStub }];

  save(userAddress: UserAddress) {
    if (userAddress.id) {
      const index = this.#userAddresses.findIndex(
        (address) => address.id === userAddress.id,
      );
      this.#userAddresses[index] = userAddress;
    } else {
      userAddress.id =
        this.#userAddresses[this.#userAddresses.length - 1].id + 1;
      this.#userAddresses.push(userAddress);
    }

    return userAddress;
  }

  delete(id: number) {
    const index = this.#userAddresses.findIndex((address) => address.id === id);
    this.#userAddresses.splice(index, 1);
  }

  findByUserId(userId: number) {
    return this.#userAddresses.filter((address) => address.userId === userId);
  }

  findOneById(id: number) {
    return this.#userAddresses.find((address) => address.id === id);
  }
}
