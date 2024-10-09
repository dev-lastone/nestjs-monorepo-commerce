import { Module } from '@nestjs/common';
import { UserAddressesAppModule } from './addresses/user-addresses.app.module';
import { UserCartsAppModule } from './carts/user-carts.app.module';

@Module({
  imports: [UserAddressesAppModule, UserCartsAppModule],
})
export class UserAppModule {}
