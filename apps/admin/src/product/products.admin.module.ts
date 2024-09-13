import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductsAdminService } from './products.admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ProductsAdminController],
  providers: [ProductsAdminService],
})
export class ProductsAdminModule {}
