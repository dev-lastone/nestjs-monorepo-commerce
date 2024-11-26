import { Test } from '@nestjs/testing';
import { OrderRepo } from '@application/order/order.repo';
import { OrdersAdminService } from '../../../../src/api/order/orders/orders.admin.service';
import { orderStub } from '../../../../../../libs/domain/test/order/_stub/order.stub';

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
