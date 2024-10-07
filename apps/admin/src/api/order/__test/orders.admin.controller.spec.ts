import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAdminController } from '../orders.admin.controller';
import { orders } from '@domain/domain/order/orders';

describe('OrdersAdminController', () => {
  let ordersAdminController: OrdersAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersAdminController],
    }).compile();

    ordersAdminController = app.get<OrdersAdminController>(
      OrdersAdminController,
    );
  });

  it('get', () => {
    expect(ordersAdminController.getOrders()).toEqual(orders);
  });
});
