import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthAdminController } from './auth.admin.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, JwtStrategy],
  exports: [AuthAdminService],
})
export class AuthAdminModule {}
