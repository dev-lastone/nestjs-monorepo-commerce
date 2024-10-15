import { Injectable } from '@nestjs/common';
import { UserAddress } from './user-address';
import { userAddressStub } from './__stub/user-address.stub';

@Injectable()
export class UserAddressRepo {
  #userAddresses: UserAddress[] = [userAddressStub];
}
