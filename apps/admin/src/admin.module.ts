import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductsAdminModule } from './product/products.admin.module';
import { AuthAdminModule } from './auth/auth.admin.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    AuthAdminModule,
    ProductsAdminModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AdminModule {}
