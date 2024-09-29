import { Module } from '@nestjs/common';
import { UserAppController } from './user.app.controller';
import { UserAppService } from './user.app.service';
import { UserAddressesAppModule } from './addresses/user-addresses.app.module';
import { UserCartsAppModule } from './carts/user-carts.app.module';

@Module({
  imports: [UserAddressesAppModule, UserCartsAppModule],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
