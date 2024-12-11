import { Module } from '@nestjs/common';
import { ProductsAppController } from './products.app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';
import { ProductsAppRepo } from './products.app.repo';
import { ProductsAppService } from './products.app.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsAppController],
  providers: [ProductsAppService, ProductsAppRepo],
})
export class ProductsAppModule {}
