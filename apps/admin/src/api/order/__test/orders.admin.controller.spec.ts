import { Test, TestingModule } from '@nestjs/testing';
import { orders } from '@domain/domain/order/orders';
import { OrdersAdminController } from '../orders/orders.admin.controller';
import { OrdersAdminService } from '../orders/orders.admin.service';

describe('OrdersAdminController', () => {
  let ordersAdminController: OrdersAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersAdminController],
      providers: [OrdersAdminService],
    }).compile();

    ordersAdminController = app.get<OrdersAdminController>(
      OrdersAdminController,
    );
  });

  it('getOrders', () => {
    expect(ordersAdminController.getOrders()).toEqual([
      {
        id: 1,
        userId: 1,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
      },
    ]);
  });

  it('getOrder', () => {
    const id = 1;
    expect(ordersAdminController.getOrder(id)).toEqual(orders[0]);
  });
});
