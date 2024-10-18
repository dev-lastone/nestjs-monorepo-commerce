import { Module } from '@nestjs/common';
import { AuthApplicationService } from '@application/auth/auth.application.service';

@Module({
  providers: [AuthApplicationService],
  exports: [AuthApplicationService],
})
export class AuthApplicationModule {}
