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
      orderProductStub.status = OrderProductStatus.ORDERED;

      const result = orderService.patchOrderProduct(orderProductStub.id, {
        status: OrderProductStatus.ON_DELIVERY,
      });

      expect(orderRepo.findOneProductById).toBeCalledWith(1);
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual({
        ...orderProductStub,
        status: OrderProductStatus.ON_DELIVERY,
      });
    });
  });

  describe('orderProductConfirm', () => {
    it('confirmed', () => {
      orderProductStub.status = OrderProductStatus.DELIVERED;

      const result = orderService.orderProductConfirm(orderProductStub.id);

      expect(orderRepo.findOneProductById).toBeCalledWith(1);
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual({
        ...orderProductStub,
        status: OrderProductStatus.CONFIRMED,
      });
    });
  });
});
