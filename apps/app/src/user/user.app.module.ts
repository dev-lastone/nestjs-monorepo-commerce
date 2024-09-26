import { Module } from '@nestjs/common';
import { UserAppController } from './user.app.controller';
import { UserAppService } from './user.app.service';
import { UserAddressesAppModule } from './addresses/user-addresses.app.module';

@Module({
  imports: [UserAddressesAppModule],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
