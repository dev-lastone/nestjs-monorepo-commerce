import { Test } from '@nestjs/testing';
import { OrderBatchRepo } from '../../src/order/order.batch.repo';
import { OrderBatchService } from '../../src/order/order.batch.service';
import { OrderService } from '@application/order/order.service';

describe('OrderBatchService', () => {
  let orderBatchService: OrderBatchService;
  let orderBatchRepo: OrderBatchRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderBatchService,
        {
          provide: OrderService,
          useValue: {
            orderProductConfirm: jest.fn(),
          },
        },
        {
          provide: OrderBatchRepo,
          useValue: {
            findOrderProductsToBeConfirmed: jest.fn(),
          },
        },
      ],
    }).compile();

    orderBatchService = testingModule.get(OrderBatchService);
    orderBatchRepo = testingModule.get(OrderBatchRepo);
  });

  // TODO
  it('confirmOrdersAutomatically', async () => {
    await orderBatchService.confirmOrdersAutomatically();

    expect(orderBatchRepo.findOrderProductsToBeConfirmed).toBeCalled();
  });
});
