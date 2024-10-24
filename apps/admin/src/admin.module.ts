import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/guard/jwt.auth.guard';
import { configModule } from '@common/setting/config';
import { AuthAdminModule } from './api/auth/auth.admin.module';
import { ProductsAdminModule } from './api/product/products.admin.module';
import { OrdersAdminModule } from './api/order/orders/orders.admin.module';
import { OrderProductsAdminModule } from './api/order/order-products/order-products.admin.module';
import { TypeOrmSettingModule } from '@common/setting/type-orm.setting.module';

@Module({
  imports: [
    configModule(),
    TypeOrmSettingModule,
    AuthAdminModule,
    ProductsAdminModule,
    OrdersAdminModule,
    OrderProductsAdminModule,
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
