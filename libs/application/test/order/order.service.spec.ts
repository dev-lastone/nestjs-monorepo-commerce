import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { OrderRepo } from '@application/order/order.repo';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrderService } from '@application/order/order.service';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import {
  orderProductStub,
  orderProductWithOrderAndProductStub,
} from '../../../domain/test/order/_stub/order-product.stub';
import { userStub } from '../../../domain/test/user/stub/user.stub';

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
          provide: AppUserPointService,
          useValue: {
            savePoint: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    orderRepo = testingModule.get(OrderRepo);
  });

  describe('orderProductDeliver', () => {
    it('not found', () => {
      jest.spyOn(orderRepo, 'findOneProductById').mockReturnValue(undefined);

      expect(
        async () => await orderService.orderProductDeliver(NON_EXISTENT_ID),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.ORDERED;

      const result = await orderService.orderProductDeliver(
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
          await orderService.orderProductConfirm({
            id: NON_EXISTENT_ID,
            userId: userStub.id,
          }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(
        async () =>
          await orderService.orderProductConfirm({
            id: orderProductStub.id,
            userId: NON_EXISTENT_ID,
          }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.DELIVERED;

      const result = await orderService.orderProductConfirm({
        id: orderProductStub.id,
        userId: userStub.id,
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
          await orderService.createOrderProductReview({
            orderProductId: NON_EXISTENT_ID,
            userId: userStub.id,
            score: 5,
            description: '내용',
          }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(
        async () =>
          await orderService.createOrderProductReview({
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
        userId: userStub.id,
        score: 5,
        description: '내용',
      };
      const result = await orderService.createOrderProductReview(dto);

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
