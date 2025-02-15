import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID, SUCCESS } from '@common/constant/constants';
import { NotFoundException } from '@nestjs/common';
import { OrderProductsAdminService } from '../../../../src/api/order/order-products/order-products.admin.service';
import { OrderProductsAdminRepo } from '../../../../src/api/order/order-products/order-products.admin.repo';
import { OrderService } from '@application/order/order.service';
import { orderProductStub } from '../../../../../../libs/domain/test/order/_stub/order-product.stub';

describe('OrderProductsAdminService', () => {
  let orderProductsAdminService: OrderProductsAdminService;
  let orderProductsAdminRepo: OrderProductsAdminRepo;
  let orderService: OrderService;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderProductsAdminService,
        {
          provide: OrderProductsAdminRepo,
          useValue: {
            findOneOrderProductById: jest
              .fn()
              .mockReturnValue(orderProductStub),
          },
        },
        {
          provide: OrderService,
          useValue: {
            orderProductDeliver: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminService = testingModule.get(OrderProductsAdminService);
    orderProductsAdminRepo = testingModule.get(OrderProductsAdminRepo);
    orderService = testingModule.get(OrderService);
  });

  describe('orderProductDeliver', () => {
    it(SUCCESS, async () => {
      await orderProductsAdminService.postOrderProductDeliver(
        orderProductStub.id,
      );

      expect(orderProductsAdminRepo.findOneOrderProductById).toBeCalledWith(1);
      expect(orderService.orderProductDeliver).toBeCalled();
    });

    it('404', () => {
      jest
        .spyOn(orderProductsAdminRepo, 'findOneOrderProductById')
        .mockReturnValue(undefined);

      expect(() =>
        orderProductsAdminService.postOrderProductDeliver(NON_EXISTENT_ID),
      ).rejects.toThrowError(new NotFoundException());
    });
  });
});
