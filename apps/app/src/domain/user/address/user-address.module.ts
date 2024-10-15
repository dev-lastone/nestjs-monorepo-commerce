import { Module } from '@nestjs/common';
import { UserAddressRepo } from './user-address.repo';

@Module({
  providers: [UserAddressRepo],
  exports: [UserAddressRepo],
})
export class UserAddressModule {}
