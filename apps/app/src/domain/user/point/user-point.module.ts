import { Module } from '@nestjs/common';
import { UserPointService } from './user-point.service';

@Module({
  providers: [UserPointService],
  exports: [UserPointService],
})
export class UserPointModule {}
