import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAppController } from '../orders.app.controller';
import { OrdersAppService } from '../orders.app.service';

describe('OrdersAppController', () => {
  let ordersAppController: OrdersAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
      id: 2,
      userId: 1,
      zipcode: '01234',
      address: '서울시 강남구 역삼동 *********',
      product: [
        {
          orderId: 2,
          id: 1,
          name: 'product-1',
          price: 1000,
        },
        {
          orderId: 2,
          id: 2,
          name: 'product-2',
          price: 2000,
        },
      ],
    });
  });

  it('get', () => {
    expect(ordersAppController.getOrders(1)).toEqual([
      {
        id: 1,
        userId: 1,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
        product: [
          {
            orderId: 1,
            id: 1,
            name: 'product-1',
            price: 1000,
          },
        ],
      },
    ]);
  });
});
