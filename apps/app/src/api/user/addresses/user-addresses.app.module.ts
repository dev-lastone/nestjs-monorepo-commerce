import { Module } from '@nestjs/common';
import { UserAddressesAppController } from './user-addresses.app.controller';
import { UserAddressesAppService } from './user-addresses.app.service';
import { UserAddressModule } from '../../../domain/user/address/user-address.module';

@Module({
  imports: [UserAddressModule],
  controllers: [UserAddressesAppController],
  providers: [UserAddressesAppService],
})
export class UserAddressesAppModule {}
