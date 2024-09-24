import { Module } from '@nestjs/common';
import { AuthService } from '@domain/domain/auth/auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
