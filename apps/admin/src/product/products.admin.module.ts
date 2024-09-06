import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductsAdminService } from './products.admin.service';

@Module({
  imports: [],
  controllers: [ProductsAdminController],
  providers: [ProductsAdminService],
})
export class ProductsAdminModule {}
