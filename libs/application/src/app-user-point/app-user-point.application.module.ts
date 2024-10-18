import { Module } from '@nestjs/common';
import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';

@Module({
  providers: [AppUserPointApplicationService],
  exports: [AppUserPointApplicationService],
})
export class AppUserPointApplicationModule {}
