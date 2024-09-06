import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProductsAdminModule } from './product/products.admin.module';

@Module({
  imports: [ProductsAdminModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
