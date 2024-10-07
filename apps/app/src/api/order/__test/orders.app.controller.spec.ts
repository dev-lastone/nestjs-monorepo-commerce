import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAppController } from '../orders.app.controller';
import { OrdersAppService } from '../orders.app.service';
import { OrderStatus } from '../../../domain/order/order-product';
import { ProductModule } from '@domain/domain/product/product.module';

describe('OrdersAppController', () => {
  let ordersAppController: OrdersAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
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
      products: [
        {
          orderId: 2,
          id: 1,
          name: '상품명',
          price: 10000,
          status: OrderStatus.ORDERED,
        },
        {
          orderId: 2,
          id: 2,
          name: '상품명2',
          price: 20000,
          status: OrderStatus.ORDERED,
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
        products: [
          {
            orderId: 1,
            id: 1,
            name: '상품명',
            price: 1000,
            status: OrderStatus.ORDERED,
          },
        ],
      },
    ]);
  });
});
