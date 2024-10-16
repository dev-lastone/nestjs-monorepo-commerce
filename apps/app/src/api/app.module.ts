import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthAppModule } from './auth/auth.app.module';
import { configModule } from '@common/common/setting/config';
import { ProductsAppModule } from './product/products.app.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/common/guard/jwt.auth.guard';
import { ProductLikeAppModule } from './product/like/product-like.app.module';
import { UserAppModule } from './user/user.app.module';
import { OrderAppModule } from './order/order.app.module';

@Module({
  imports: [
    configModule(),
    AuthAppModule,
    OrderAppModule,
    UserAppModule,
    ProductsAppModule,
    ProductLikeAppModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
