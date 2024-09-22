import { Module } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { AuthAppController } from './auth.app.controller';

@Module({
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
