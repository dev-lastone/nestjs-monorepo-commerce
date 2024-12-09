import { Module } from '@nestjs/common';
import { UserCartsAppController } from './user-carts.app.controller';
import { AppUserCartModule } from '@application/app-user/cart/app-user-cart.module';

@Module({
  imports: [AppUserCartModule],
  controllers: [UserCartsAppController],
})
export class UserCartsAppModule {}
