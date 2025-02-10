import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrderService } from '@application/order/order.service';
import { OrderProductsAppService } from '../../../../src/api/order/order-products/order-products.app.service';
import { OrderProductsAppRepo } from '../../../../src/api/order/order-products/order-products.app.repo';
import { orderProductWithOrderAndProductStub } from '../../../../../../libs/domain/test/order/_stub/order-product.stub';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';

describe('OrderProductsAppService', () => {
  let orderService: OrderService;
  let orderProductsAppService: OrderProductsAppService;
  let orderProductsAppRepo: OrderProductsAppRepo;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderProductsAppService,
        {
          provide: OrderService,
          useValue: {
            orderProductConfirm: jest.fn(),
          },
        },
        {
          provide: OrderProductsAppRepo,
          useValue: {
            findOneOrderProductWithOrderAndProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    orderProductsAppService = testingModule.get(OrderProductsAppService);
    orderProductsAppRepo = testingModule.get(OrderProductsAppRepo);
  });

  describe('orderProductConfirm', () => {
    it('성공', async () => {
      jest
        .spyOn(orderProductsAppRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockResolvedValue(orderProductWithOrderAndProductStub);

      await orderProductsAppService.postOrderProductConfirm({
        id: orderProductWithOrderAndProductStub.id,
        userId: orderProductWithOrderAndProductStub.order.userId,
      });

      expect(orderService.orderProductConfirm).toBeCalledWith(
        orderProductWithOrderAndProductStub,
      );
    });

    it('403', async () => {
      jest
        .spyOn(orderProductsAppRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockResolvedValue(orderProductWithOrderAndProductStub);

      await expect(() =>
        orderProductsAppService.postOrderProductConfirm({
          id: orderProductWithOrderAndProductStub.id,
          userId: NON_EXISTENT_ID,
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('404', () => {
      jest
        .spyOn(orderProductsAppRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockReturnValue(undefined);

      expect(() =>
        orderProductsAppService.postOrderProductConfirm({
          id: NON_EXISTENT_ID,
          userId: userStub.id,
        }),
      ).rejects.toThrowError(new NotFoundException());
    });
  });
});
