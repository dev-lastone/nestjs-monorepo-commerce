import { Test } from '@nestjs/testing';
import { orderStub } from '@domain/order/__stub/order.stub';
import { OrderRepo } from '@application/order/order.repo';
import { OrdersAdminService } from '../../../../src/api/order/orders/orders.admin.service';

describe('OrdersAdminService', () => {
  let ordersAdminService: OrdersAdminService;
  let orderRepo: OrderRepo;

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
    orderRepo = testingModule.get(OrderRepo);
  });

  it('getOrders', () => {
    ordersAdminService.getOrders();

    expect(orderRepo.find).toBeCalled();
  });

  it('getOrder', () => {
    ordersAdminService.getOrder(orderStub.id);

    expect(orderRepo.findOne).toBeCalledWith(orderStub.id);
  });
});
