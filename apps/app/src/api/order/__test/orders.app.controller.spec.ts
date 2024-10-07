import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAppController } from '../orders.app.controller';
import { OrdersAppService } from '../orders.app.service';
import { OrderStatus } from '../../../domain/order/order-product';
import { ProductModule } from '@domain/domain/product/product.module';
import {
  productStub1,
  productStub2,
} from '@domain/domain/product/__stub/product.stub';

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
          productId: productStub1.id,
          name: productStub1.name,
          price: productStub1.price,
          status: OrderStatus.ORDERED,
        },
        {
          orderId: 2,
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
            productId: productStub1.id,
            name: productStub1.name,
            price: productStub1.price,
            status: OrderStatus.ORDERED,
          },
        ],
      },
    ]);
  });
});
