import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductsAdminModule } from './product/products.admin.module';
import { AuthAdminModule } from './auth/auth.admin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthAdminModule,
    ProductsAdminModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
