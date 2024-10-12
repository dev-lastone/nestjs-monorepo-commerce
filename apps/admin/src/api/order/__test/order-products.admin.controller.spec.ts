import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductsAdminService } from '../order-products/order-products.admin.service';
import { OrderProductsAdminController } from '../order-products/order-products.admin.controller';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { OrderModule } from '@domain/domain/order/order.module';

describe('OrderProductsAdminController', () => {
  let orderProductsAdminController: OrderProductsAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
      controllers: [OrderProductsAdminController],
      providers: [OrderProductsAdminService],
    }).compile();

    orderProductsAdminController = app.get<OrderProductsAdminController>(
      OrderProductsAdminController,
    );
  });

  it('patchOrderProduct', () => {
    expect(
      orderProductsAdminController.patchOrderProduct(1, {
        status: OrderProductStatus.ON_DELIVERY,
      }),
    ).toEqual({
      id: 1,
      productId: productStub1.id,
      name: productStub1.name,
      price: productStub1.price,
      status: OrderProductStatus.ON_DELIVERY,
    });
  });
});
