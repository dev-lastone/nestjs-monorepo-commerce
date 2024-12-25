import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { OrderRepo } from '@application/order/order.repo';
import { NON_EXISTENT_ID, SUCCESS } from '@common/constant/constants';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from '@application/order/order.service';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import {
  createOrderProductReviewDtoStub,
  orderProductStub,
  orderProductWithOrderAndProductStub,
} from '../../../domain/test/order/_stub/order-product.stub';
import { userStub } from '../../../domain/test/user/stub/user.stub';
import { productStub1 } from '../../../domain/test/product/_stub/product.stub';
import { UserAddressService } from '../../../../apps/app/src/application/user/address/user-address.service';
import { ProductService } from '@application/product/product.service';
import { orderStub } from '../../../domain/test/order/_stub/order.stub';
import { Order } from '@domain/order/order.entity';
import { appUserAddressStub } from '../../../domain/test/app-user/_stub/app-user-address.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

describe('OrderService', () => {
  let orderService: OrderService;
  let userAddressService: UserAddressService;
  let productService: ProductService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepo,
          useValue: {
            save: jest.fn().mockReturnValue(orderStub),
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
            findOneOrderProductWithOrderAndProduct: jest
              .fn()
              .mockReturnValue(orderProductWithOrderAndProductStub),
            findOneWithOrderProductReview: jest
              .fn()
              .mockReturnValue(orderProductWithOrderAndProductStub),
            saveProductReview: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findOneProduct: jest.fn().mockReturnValue(productStub1),
          },
        },
        {
          provide: UserAddressService,
          useValue: {
            getUserAddressById: jest.fn().mockReturnValue(appUserAddressStub),
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
    userAddressService = testingModule.get(UserAddressService);
    productService = testingModule.get(ProductService);
    orderRepo = testingModule.get(OrderRepo);
  });

  describe('createOrder', () => {
    it('403', () => {
      expect(() =>
        orderService.createOrder({
          userId: 2n,
          userAddressId: 1n,
          productIds: [1n, 2n],
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it(ERROR_MESSAGES.NotEnoughStock, () => {
      jest
        .spyOn(productService, 'findOneProduct')
        .mockResolvedValue({ ...productStub1, stock: 0 });

      expect(
        orderService.createOrder({
          userId: userStub.id,
          userAddressId: appUserAddressStub.id,
          productIds: [productStub1.id],
        }),
      ).rejects.toThrowError(
        new BadRequestException(ERROR_MESSAGES.NotEnoughStock),
      );
    });

    it('성공', async () => {
      const dto = {
        userId: userStub.id,
        userAddressId: appUserAddressStub.id,
        productIds: [productStub1.id],
      };

      const result = await orderService.createOrder(dto);

      expect(userAddressService.getUserAddressById).toBeCalledWith(
        dto.userAddressId,
      );
      expect(productService.findOneProduct).toBeCalledWith(dto.productIds[0]);

      const order = Order.create(appUserAddressStub, [productStub1]);
      expect(orderRepo.save).toBeCalledWith(order);

      expect(result).toEqual(orderStub);
    });
  });

  describe('orderProductDeliver', () => {
    it('not found', () => {
      jest.spyOn(orderRepo, 'findOneProductById').mockReturnValue(undefined);

      expect(
        async () => await orderService.orderProductDeliver(NON_EXISTENT_ID),
      ).rejects.toThrowError(new NotFoundException());
    });

    it(SUCCESS, async () => {
      orderProductStub.status = OrderProductStatus.ORDERED;

      const result = await orderService.orderProductDeliver(
        orderProductStub.id,
      );

      expect(orderRepo.findOneProductById).toBeCalledWith(1n);
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
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProduct')
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

      expect(orderRepo.findOneOrderProductWithOrderAndProduct).toBeCalledWith(
        1n,
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
        .spyOn(orderRepo, 'findOneWithOrderProductReview')
        .mockReturnValue(undefined);

      expect(
        async () =>
          await orderService.createOrderProductReview({
            orderProductId: NON_EXISTENT_ID,
            userId: userStub.id,
            ...createOrderProductReviewDtoStub,
          }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('403', () => {
      expect(
        async () =>
          await orderService.createOrderProductReview({
            orderProductId: orderProductStub.id,
            userId: NON_EXISTENT_ID,
            ...createOrderProductReviewDtoStub,
          }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      orderProductStub.status = OrderProductStatus.CONFIRMED;
      const dto = {
        orderProductId: orderProductStub.id,
        userId: userStub.id,
        ...createOrderProductReviewDtoStub,
      };
      await orderService.createOrderProductReview(dto);

      expect(orderRepo.findOneWithOrderProductReview).toBeCalledWith(1n);
      expect(orderRepo.saveProductReview).toBeCalled();
    });
  });
});
