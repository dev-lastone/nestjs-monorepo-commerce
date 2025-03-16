import { Test } from '@nestjs/testing';
import { OrdersAdminService } from '../../../../src/api/order/orders/orders.admin.service';
import { orderStub } from '../../../../../../libs/domain/test/order/_stub/order.stub';
import { OrdersAdminRepo } from '../../../../src/api/order/orders/orders.admin.repo';

describe('OrdersAdminService', () => {
  let ordersAdminService: OrdersAdminService;
  let ordersAdminRepo: OrdersAdminRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrdersAdminService,
        {
          provide: OrdersAdminRepo,
          useValue: {
            find: jest.fn().mockReturnValue([orderStub]),
            findOne: jest.fn().mockReturnValue(orderStub),
          },
        },
      ],
    }).compile();

    ordersAdminService = testingModule.get(OrdersAdminService);
    ordersAdminRepo = testingModule.get(OrdersAdminRepo);
  });

  it('getOrders', () => {
    ordersAdminService.getOrders();

    expect(ordersAdminRepo.find).toBeCalled();
  });

  it('getOrder', () => {
    ordersAdminService.getOrder(orderStub.id);

    expect(ordersAdminRepo.findOne).toHaveBeenCalledWith(orderStub.id);
  });
});
