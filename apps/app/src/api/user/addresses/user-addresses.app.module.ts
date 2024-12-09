import { Module } from '@nestjs/common';
import { UserAddressesAppController } from './user-addresses.app.controller';
import { UserAddressesAppService } from './user-addresses.app.service';
import { AppUserAddressModule } from '@application/app-user/address/app-user-address.module';

@Module({
  imports: [AppUserAddressModule],
  controllers: [UserAddressesAppController],
  providers: [UserAddressesAppService],
})
export class UserAddressesAppModule {}
