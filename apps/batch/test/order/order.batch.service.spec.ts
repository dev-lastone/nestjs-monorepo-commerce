import { Test } from '@nestjs/testing';
import { OrderBatchRepo } from '../../src/order/order.batch.repo';
import { OrderBatchService } from '../../src/order/order.batch.service';
import { OrderService } from '@application/order/order.service';
import { orderProductWithOrderAndProductStub } from '../../../../libs/domain/test/order/_stub/order-product.stub';

describe('OrderBatchService', () => {
  let orderService: OrderService;
  let orderBatchService: OrderBatchService;
  let orderBatchRepo: OrderBatchRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderBatchService,
        {
          provide: OrderService,
          useValue: {
            orderProductDeliver: jest.fn(),
            orderProductConfirm: jest.fn(),
          },
        },
        {
          provide: OrderBatchRepo,
          useValue: {
            findOrderProductsToBeDelivered: jest
              .fn()
              .mockResolvedValue([orderProductWithOrderAndProductStub]),
            findOrderProductsToBeConfirmed: jest
              .fn()
              .mockResolvedValue([orderProductWithOrderAndProductStub]),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    orderBatchService = testingModule.get(OrderBatchService);
    orderBatchRepo = testingModule.get(OrderBatchRepo);
  });

  it('deliveryOrderProductsAutomatically', async () => {
    await orderBatchService.deliveryOrderProductsAutomatically();

    expect(orderBatchRepo.findOrderProductsToBeDelivered).toBeCalled();
    expect(orderService.orderProductDeliver).toBeCalledWith(
      orderProductWithOrderAndProductStub.id,
    );
  });

  it('confirmOrderProductsAutomatically', async () => {
    await orderBatchService.confirmOrderProductsAutomatically();

    expect(orderBatchRepo.findOrderProductsToBeConfirmed).toBeCalled();
    expect(orderService.orderProductConfirm).toBeCalledWith(
      orderProductWithOrderAndProductStub,
    );
  });
});
