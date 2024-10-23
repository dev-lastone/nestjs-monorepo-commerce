import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthAppModule } from './auth/auth.app.module';
import { configModule } from '@common/setting/config';
import { ProductsAppModule } from './product/products.app.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/guard/jwt.auth.guard';
import { ProductLikeAppModule } from './product/like/product-like.app.module';
import { UserAppModule } from './user/user.app.module';
import { OrderAppModule } from './order/order.app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    configModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        join(__dirname, '../../../../libs/domain/src/**/*.entity.js'), // domain
      ],
      synchronize: true,
    }),
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
