import { Test } from '@nestjs/testing';
import {
  productStub1,
  productStub2,
} from '@domain/domain/product/__stub/product.stub';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { orderStub } from '@domain/domain/order/__stub/order.stub';
import { OrdersAppService } from '../orders.app.service';
import { ProductModule } from '@domain/domain/product/product.module';
import { OrderModule } from '@domain/domain/order/order.module';

describe('OrdersAppService', () => {
  let ordersAppService: OrdersAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [ProductModule, OrderModule],
      providers: [OrdersAppService],
    }).compile();

    ordersAppService = testingModule.get(OrdersAppService);
  });

  it('postOrder', () => {
    expect(
      ordersAppService.postOrder(1, {
        productIds: [1, 2],
      }),
    ).toEqual({
      id: 2,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      products: [
        {
          id: 2,
          orderId: 2,
          productId: productStub1.id,
          name: productStub1.name,
          price: productStub1.price,
          status: OrderProductStatus.ORDERED,
        },
        {
          id: 3,
          orderId: 2,
          productId: productStub2.id,
          name: productStub2.name,
          price: productStub2.price,
          status: OrderProductStatus.ORDERED,
        },
      ],
    });
  });

  it('getOrders', () => {
    expect(ordersAppService.getOrders(1)).toEqual([orderStub]);
  });
});
