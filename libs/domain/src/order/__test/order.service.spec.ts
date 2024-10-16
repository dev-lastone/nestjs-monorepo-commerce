import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { orderProductStub } from '@domain/domain/order/__stub/order-product.stub';
import { OrderService } from '@domain/domain/order/order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepo,
          useValue: {
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    orderRepo = testingModule.get(OrderRepo);
  });

  describe('patchOrderProduct', () => {
    it('onDelivery', () => {
      const result = orderService.patchOrderProduct(1, {
        status: OrderProductStatus.ON_DELIVERY,
      });

      expect(orderRepo.findOneProductById).toBeCalledWith(1);
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual(orderProductStub);
    });

    it('confirmed', () => {
      const result = orderService.patchOrderProduct(1, {
        status: OrderProductStatus.CONFIRMED,
      });

      expect(orderRepo.findOneProductById).toBeCalledWith(1);
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual(orderProductStub);
    });
  });
});
