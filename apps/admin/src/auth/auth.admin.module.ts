import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
