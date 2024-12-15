import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { UserAddressRepo } from './user-address.repo';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserAddress])],
  providers: [UserAddressService, UserAddressRepo],
  exports: [UserAddressService],
})
export class UserAddressModule {}
