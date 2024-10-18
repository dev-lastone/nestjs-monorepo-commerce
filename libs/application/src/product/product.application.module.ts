import { Module } from '@nestjs/common';
import { ProductModule } from '@domain/product/product.module';
import { ProductApplicationService } from '@application/product/product.application.service';

@Module({
  imports: [ProductModule],
  providers: [ProductApplicationService],
  exports: [ProductApplicationService],
})
export class ProductApplicationModule {}
