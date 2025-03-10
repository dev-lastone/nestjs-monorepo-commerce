import { Module } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
