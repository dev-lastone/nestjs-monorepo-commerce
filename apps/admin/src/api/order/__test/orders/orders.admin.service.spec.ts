import { Test } from '@nestjs/testing';
import { orderStub } from '@domain/order/__stub/order.stub';
import { OrderRepo } from '@domain/order/order.repo';
import { OrdersAdminService } from '../../orders/orders.admin.service';

describe('OrdersAdminService', () => {
  let ordersAdminService: OrdersAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrdersAdminService,
        {
          provide: OrderRepo,
          useValue: {
            find: jest.fn().mockReturnValue([orderStub]),
            findOne: jest.fn().mockReturnValue(orderStub),
          },
        },
      ],
    }).compile();

    ordersAdminService = testingModule.get(OrdersAdminService);
  });

  it('getOrders', async () => {
    const result = await ordersAdminService.getOrders();
    expect(result).toEqual([
      {
        id: orderStub.id,
        userId: orderStub.userId,
        zipcode: orderStub.zipcode,
        address: orderStub.address,
      },
    ]);
  });

  it('getOrder', async () => {
    const result = await ordersAdminService.getOrder(orderStub.id);
    expect(result).toEqual(orderStub);
  });
});
