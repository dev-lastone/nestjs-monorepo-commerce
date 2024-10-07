import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductsAdminModule } from './product/products.admin.module';
import { AuthAdminModule } from './auth/auth.admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/common/guard/jwt.auth.guard';
import { configModule } from '@common/common/setting/config';
import { OrdersAdminModule } from './order/orders.admin.module';

@Module({
  imports: [
    configModule(),
    AuthAdminModule,
    ProductsAdminModule,
    OrdersAdminModule,
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
