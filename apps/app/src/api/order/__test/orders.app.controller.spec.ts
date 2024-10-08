import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAppController } from '../orders.app.controller';
import { OrdersAppService } from '../orders.app.service';
import { ProductModule } from '@domain/domain/product/product.module';
import {
  productStub1,
  productStub2,
} from '@domain/domain/product/__stub/product.stub';
import { OrderStatus } from '@domain/domain/order/order-product';
import { OrderModule } from '@domain/domain/order/order.module';

describe('OrdersAppController', () => {
  let ordersAppController: OrdersAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule, OrderModule],
      controllers: [OrdersAppController],
      providers: [OrdersAppService],
    }).compile();

    ordersAppController = app.get<OrdersAppController>(OrdersAppController);
  });

  it('post', () => {
    expect(
      ordersAppController.postOrder(1, {
        productIds: [1, 2],
      }),
    ).toEqual({
      id: 1,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      products: [
        {
          id: 1,
          orderId: 1,
          productId: productStub1.id,
          name: productStub1.name,
          price: productStub1.price,
          status: OrderStatus.ORDERED,
        },
        {
          orderId: 1,
          id: 2,
          productId: productStub2.id,
          name: productStub2.name,
          price: productStub2.price,
          status: OrderStatus.ORDERED,
        },
      ],
    });
  });

  it('get', () => {
    ordersAppController.postOrder(1, {
      productIds: [1, 2],
    });

    expect(ordersAppController.getOrders(1)).toEqual([
      {
        id: 1,
        userId: 1,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
        products: [
          {
            id: 1,
            orderId: 1,
            productId: productStub1.id,
            name: productStub1.name,
            price: productStub1.price,
            status: OrderStatus.ORDERED,
          },
          {
            id: 2,
            orderId: 1,
            productId: productStub2.id,
            name: productStub2.name,
            price: productStub2.price,
            status: OrderStatus.ORDERED,
          },
        ],
      },
    ]);
  });
});
