import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAdminController } from '../orders/orders.admin.controller';
import { OrdersAdminService } from '../orders/orders.admin.service';
import { OrderModule } from '@domain/domain/order/order.module';
import { orderStub } from '@domain/domain/order/__stub/order.stub';

describe('OrdersAdminController', () => {
  let ordersAdminController: OrdersAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
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
        id: orderStub.id,
        userId: orderStub.userId,
        zipcode: orderStub.zipcode,
        address: orderStub.address,
      },
    ]);
  });

  it('getOrder', () => {
    expect(ordersAdminController.getOrder(orderStub.id)).toEqual(orderStub);
  });
});
