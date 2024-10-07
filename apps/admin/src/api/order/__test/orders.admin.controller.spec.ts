import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAdminController } from '../orders.admin.controller';
import { orders } from '@domain/domain/order/orders';
import { OrdersAdminService } from '../orders.admin.service';

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
    expect(ordersAdminController.getOrders()).toEqual(orders);
  });

  it('getOrder', () => {
    const id = 1;
    expect(ordersAdminController.getOrder(id)).toEqual(orders[0]);
  });
});
