import { Module } from '@nestjs/common';
import { AppUserAddressRepo } from './app-user-address.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from '@domain/app-user/user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [AppUserAddressRepo],
  exports: [AppUserAddressRepo],
})
export class AppUserAddressModule {}
