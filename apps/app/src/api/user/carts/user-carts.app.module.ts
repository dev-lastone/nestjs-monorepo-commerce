import { Module } from '@nestjs/common';
import { UserCartsAppController } from './user-carts.app.controller';
import { UserCartModule } from '../../../application/user/cart/user-cart.module';

@Module({
  imports: [UserCartModule],
  controllers: [UserCartsAppController],
})
export class UserCartsAppModule {}
