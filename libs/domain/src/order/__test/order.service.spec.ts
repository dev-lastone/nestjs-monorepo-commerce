import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import {
  orderProductStub,
  orderProductWithOrderAndProductStub,
} from '@domain/domain/order/__stub/order-product.stub';
import { OrderService } from '@domain/domain/order/order.service';
import { appUserStub } from '@domain/domain/app-user/__stub/app-user.stub';
import { UserPointService } from '@domain/domain/app-user/point/user-point.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        UserPointService,
        {
          provide: OrderRepo,
          useValue: {
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
            findOneOrderProductWishOrderAndProduct: jest
              .fn()
              .mockReturnValue(orderProductWithOrderAndProductStub),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    orderRepo = testingModule.get(OrderRepo);
  });

  it('orderProductDeliver', () => {
    orderProductStub.status = OrderProductStatus.ORDERED;

    const result = orderService.orderProductDeliver(orderProductStub.id);

    expect(orderRepo.findOneProductById).toBeCalledWith(1);
    expect(orderRepo.saveProduct).toBeCalled();
    expect(result).toEqual({
      ...orderProductStub,
      status: OrderProductStatus.ON_DELIVERY,
    });
  });

  it('orderProductConfirm', () => {
    orderProductStub.status = OrderProductStatus.DELIVERED;

    const result = orderService.orderProductConfirm({
      id: orderProductStub.id,
      userId: appUserStub.id,
    });

    expect(orderRepo.findOneOrderProductWishOrderAndProduct).toBeCalledWith(1);
    expect(orderRepo.saveProduct).toBeCalled();
    expect(result).toEqual({
      ...orderProductStub,
      status: OrderProductStatus.CONFIRMED,
    });
  });
});
