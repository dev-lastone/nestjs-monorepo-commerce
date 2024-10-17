import { Module } from '@nestjs/common';
import { UserPointService } from '@domain/domain/app-user/point/user-point.service';

@Module({
  providers: [UserPointService],
  exports: [UserPointService],
})
export class UserPointModule {}
