import { Module } from '@nestjs/common';
import { UserAddressRepo } from './user-address.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [UserAddressRepo],
  exports: [UserAddressRepo],
})
export class UserAddressModule {}
