import { Module } from '@nestjs/common';
import { UserCartService } from './user-cart.service';

@Module({
  providers: [UserCartService],
  exports: [UserCartService],
})
export class UserCartModule {}
