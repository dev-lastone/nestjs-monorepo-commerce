import { Module } from '@nestjs/common';
import { UserCartsAppController } from './user-carts.app.controller';
import { UserCartsAppService } from './user-carts.app.service';

@Module({
  controllers: [UserCartsAppController],
  providers: [UserCartsAppService],
})
export class UserCartsAppModule {}
