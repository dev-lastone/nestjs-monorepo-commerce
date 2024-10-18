import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import {
  orderProductStub,
  orderProductWithOrderAndProductStub,
} from '@domain/domain/order/__stub/order-product.stub';
import { appUserStub } from '@domain/domain/app-user/__stub/app-user.stub';
import { UserPointService } from '@domain/domain/app-user/point/user-point.service';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrderApplicationService } from '@application/application/order/order.application.service';

describe('OrderApplicationService', () => {
  let orderApplicationService: OrderApplicationService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderApplicationService,
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

    orderApplicationService = testingModule.get(OrderApplicationService);
    orderRepo = testingModule.get(OrderRepo);
  });

  describe('orderProductDeliver', () => {
    it('not found', () => {
      jest.spyOn(orderRepo, 'findOneProductById').mockReturnValue(undefined);

      expect(() =>
        orderApplicationService.orderProductDeliver(NON_EXISTENT_ID),
      ).toThrowError(new NotFoundException());
    });

    it('성공', () => {
      orderProductStub.status = OrderProductStatus.ORDERED;

      const result = orderApplicationService.orderProductDeliver(
        orderProductStub.id,
      );

      expect(orderRepo.findOneProductById).toBeCalledWith(1);
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual({
        ...orderProductStub,
        status: OrderProductStatus.ON_DELIVERY,
      });
    });
  });

  describe('orderProductConfirm', () => {
    it('404', () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWishOrderAndProduct')
        .mockReturnValue(undefined);

      expect(() =>
        orderApplicationService.orderProductConfirm({
          id: NON_EXISTENT_ID,
          userId: appUserStub.id,
        }),
      ).toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(() =>
        orderApplicationService.orderProductConfirm({
          id: orderProductStub.id,
          userId: NON_EXISTENT_ID,
        }),
      ).toThrowError(new ForbiddenException());
    });

    it('성공', () => {
      orderProductStub.status = OrderProductStatus.DELIVERED;

      const result = orderApplicationService.orderProductConfirm({
        id: orderProductStub.id,
        userId: appUserStub.id,
      });

      expect(orderRepo.findOneOrderProductWishOrderAndProduct).toBeCalledWith(
        1,
      );
      expect(orderRepo.saveProduct).toBeCalled();
      expect(result).toEqual({
        ...orderProductStub,
        status: OrderProductStatus.CONFIRMED,
      });
    });
  });
});
