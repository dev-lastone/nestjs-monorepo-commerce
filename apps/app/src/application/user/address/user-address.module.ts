import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from '@domain/app-user/user-address.entity';
import { UserAddressRepo } from './user-address.repo';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [UserAddressService, UserAddressRepo],
  exports: [UserAddressService],
})
export class UserAddressModule {}
