import { Test } from '@nestjs/testing';
import { orderStub } from '@domain/domain/order/__stub/order.stub';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { OrdersAdminService } from '../../orders/orders.admin.service';

describe('OrdersAdminService', () => {
  let ordersAdminService: OrdersAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [OrdersAdminService, OrderRepo],
    }).compile();

    ordersAdminService = testingModule.get(OrdersAdminService);
  });

  it('getOrders', () => {
    expect(ordersAdminService.getOrders()).toEqual([
      {
        id: orderStub.id,
        userId: orderStub.userId,
        zipcode: orderStub.zipcode,
        address: orderStub.address,
      },
    ]);
  });

  it('getOrder', () => {
    expect(ordersAdminService.getOrder(orderStub.id)).toEqual(orderStub);
  });
});
