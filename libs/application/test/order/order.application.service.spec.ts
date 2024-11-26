import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { OrderRepo } from '@application/order/order.repo';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrderApplicationService } from '@application/order/order.application.service';
import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';
import {
  orderProductStub,
  orderProductWithOrderAndProductStub,
} from '../../../domain/test/order/_stub/order-product.stub';
import { appUserStub } from '../../../domain/test/app-user/_stub/app-user.stub';

describe('OrderApplicationService', () => {
  let orderApplicationService: OrderApplicationService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderApplicationService,
        {
          provide: OrderRepo,
          useValue: {
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
            findOneOrderProductWishOrderAndProduct: jest
              .fn()
              .mockReturnValue(orderProductWithOrderAndProductStub),
            findOneWishOrderProductReview: jest
              .fn()
              .mockReturnValue(orderProductWithOrderAndProductStub),
            saveProductReview: jest.fn(),
          },
        },
        {
          provide: AppUserPointApplicationService,
          useValue: {
            savePoint: jest.fn(),
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

      expect(
        async () =>
          await orderApplicationService.orderProductDeliver(NON_EXISTENT_ID),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.ORDERED;

      const result = await orderApplicationService.orderProductDeliver(
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

      expect(
        async () =>
          await orderApplicationService.orderProductConfirm({
            id: NON_EXISTENT_ID,
            userId: appUserStub.id,
          }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(
        async () =>
          await orderApplicationService.orderProductConfirm({
            id: orderProductStub.id,
            userId: NON_EXISTENT_ID,
          }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.DELIVERED;

      const result = await orderApplicationService.orderProductConfirm({
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

  describe('createOrderProductReview', () => {
    it('404', () => {
      jest
        .spyOn(orderRepo, 'findOneWishOrderProductReview')
        .mockReturnValue(undefined);

      expect(
        async () =>
          await orderApplicationService.createOrderProductReview({
            orderProductId: NON_EXISTENT_ID,
            userId: appUserStub.id,
            score: 5,
            description: '내용',
          }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(
        async () =>
          await orderApplicationService.createOrderProductReview({
            orderProductId: orderProductStub.id,
            userId: NON_EXISTENT_ID,
            score: 5,
            description: '내용',
          }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.CONFIRMED;
      const dto = {
        orderProductId: orderProductStub.id,
        userId: appUserStub.id,
        score: 5,
        description: '내용',
      };
      const result =
        await orderApplicationService.createOrderProductReview(dto);

      expect(orderRepo.findOneWishOrderProductReview).toBeCalledWith(1);
      expect(orderRepo.saveProductReview).toBeCalled();
      expect(result).toEqual({
        orderProductId: dto.orderProductId,
        score: dto.score,
        description: dto.description,
      });
    });
  });
});
