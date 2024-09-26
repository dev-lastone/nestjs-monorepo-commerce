import { Module } from '@nestjs/common';
import { UserAddressesAppController } from './user-addresses.app.controller';
import { UserAddressesAppService } from './user-addresses.app.service';

@Module({
  controllers: [UserAddressesAppController],
  providers: [UserAddressesAppService],
})
export class UserAddressesAppModule {}
