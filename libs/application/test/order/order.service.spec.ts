import { Test } from '@nestjs/testing';
import { OrderRepo } from '@application/order/order.repo';
import { NON_EXISTENT_ID } from '@common/constant/constants';
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
  orderProductWithOrderAndProductAndReviewStub,
  orderProductWithOrderAndProductStub,
} from '../../../domain/test/order/_stub/order-product.stub';
import { userStub } from '../../../domain/test/user/stub/user.stub';
import { productStub1 } from '../../../domain/test/product/_stub/product.stub';
import { UserAddressService } from '../../../../apps/app/src/application/user/address/user-address.service';
import { ProductService } from '@application/product/product.service';
import { orderStub } from '../../../domain/test/order/_stub/order.stub';
import { appUserAddressStub } from '../../../domain/test/app-user/_stub/app-user-address.stub';
import { orderProductReviewStub } from '../../../domain/test/order/_stub/order-product-review.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { Order } from '@domain/order/order.entity';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

describe('OrderService', () => {
  let orderService: OrderService;
  let userAddressService: UserAddressService;
  let productService: ProductService;
  let appUserPointService: AppUserPointService;
  let orderRepo: OrderRepo;

  beforeEach(() => {
    productStub1.stock = 1;
  });

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepo,
          useValue: {
            save: jest.fn().mockReturnValue(orderStub),
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
            findOneOrderProductWithOrderAndProductAndReview: jest.fn(),
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
            savePointByOrderProduct: jest.fn(),
            savePointByReview: jest.fn(),
            usePoint: jest.fn(),
          },
        },
      ],
    }).compile();

    orderService = testingModule.get(OrderService);
    userAddressService = testingModule.get(UserAddressService);
    productService = testingModule.get(ProductService);
    appUserPointService = testingModule.get(AppUserPointService);
    orderRepo = testingModule.get(OrderRepo);
  });

  describe('createOrder', () => {
    it('403', () => {
      expect(
        orderService.createOrder({
          userId: 2,
          userAddressId: 1,
          productIds: [1],
          point: 0,
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('포인트 0', async () => {
      const dto = {
        userId: userStub.id,
        userAddressId: appUserAddressStub.id,
        productIds: [productStub1.id],
        point: 0,
      };

      const result = await orderService.createOrder(dto);

      expect(userAddressService.getUserAddressById).toHaveBeenCalledWith(
        dto.userAddressId,
      );
      expect(productService.findOneProduct).toHaveBeenCalledWith(
        dto.productIds[0],
      );

      productStub1.stock = 1; // TODO orderService.createOrder 에서 이미 재고처리가 진행되어, 강제로 복구. 좋은 방법 고민해보기
      const order = Order.create(appUserAddressStub, [productStub1]);
      expect(orderRepo.save).toHaveBeenCalledWith(order);
      expect(result).toEqual(order);
    });

    it('포인트 사용', async () => {
      const dto = {
        userId: userStub.id,
        userAddressId: appUserAddressStub.id,
        productIds: [productStub1.id],
        point: 100,
      };

      const result = await orderService.createOrder(dto);

      expect(userAddressService.getUserAddressById).toHaveBeenCalledWith(
        dto.userAddressId,
      );
      expect(productService.findOneProduct).toHaveBeenCalledWith(
        dto.productIds[0],
      );

      productStub1.stock = 1; // TODO orderService.createOrder 에서 이미 재고처리가 진행되어, 강제로 복구. 좋은 방법 고민해보기
      const order = Order.create(appUserAddressStub, [productStub1]);
      expect(orderRepo.save).toHaveBeenCalledWith(order);
      expect(appUserPointService.usePoint).toHaveBeenCalledWith(userStub.id, {
        point: dto.point,
        action: AppUserPointHistoryAction.ORDER,
        actionId: orderStub.id,
      });
      expect(result).toEqual(order);
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
          point: 0,
        }),
      ).rejects.toThrowError(
        new BadRequestException(ERROR_MESSAGES.NotEnoughStock),
      );
    });
  });

  it('orderProductDeliver', async () => {
    const result = await orderService.orderProductDeliver(orderProductStub);

    expect(orderRepo.saveProduct).toHaveBeenCalled();
    expect(result).toEqual({
      ...orderProductStub,
      status: OrderProductStatus.ON_DELIVERY,
    });
  });

  it('delivered', async () => {
    const result = await orderService.delivered(orderProductStub);

    expect(orderRepo.saveProduct).toHaveBeenCalled();
    expect(result).toEqual({
      ...orderProductStub,
      status: OrderProductStatus.DELIVERED,
    });
  });

  it('orderProductConfirm', async () => {
    const orderProduct = orderProductWithOrderAndProductStub;

    const result = await orderService.orderProductConfirm(orderProduct);

    expect(appUserPointService.savePointByOrderProduct).toHaveBeenCalledWith(
      orderProductWithOrderAndProductStub,
    );
    expect(orderRepo.saveProduct).toHaveBeenCalledWith(
      orderProductWithOrderAndProductStub,
    );
    expect(result).toEqual(orderProductWithOrderAndProductStub);
  });

  describe('createOrderProductReview', () => {
    it('성공', async () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProductAndReview')
        .mockResolvedValue(orderProductWithOrderAndProductAndReviewStub);
      jest
        .spyOn(orderRepo, 'saveProductReview')
        .mockResolvedValue(orderProductReviewStub);

      const dto = {
        orderProductId: orderProductWithOrderAndProductAndReviewStub.id,
        userId: userStub.id,
        ...createOrderProductReviewDtoStub,
      };
      await orderService.createOrderProductReview(dto);

      const orderProductReview =
        orderProductWithOrderAndProductAndReviewStub.createReview({
          score: dto.score,
          description: dto.description,
        });

      expect(
        orderRepo.findOneOrderProductWithOrderAndProductAndReview,
      ).toHaveBeenCalledWith(orderProductWithOrderAndProductAndReviewStub.id);
      expect(orderRepo.saveProductReview).toHaveBeenCalledWith(
        orderProductReview,
      );
      expect(appUserPointService.savePointByReview).toHaveBeenCalledWith(
        orderProductReviewStub,
      );
    });

    it('403', async () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProductAndReview')
        .mockResolvedValue(orderProductWithOrderAndProductAndReviewStub);

      await expect(() =>
        orderService.createOrderProductReview({
          orderProductId: orderProductWithOrderAndProductAndReviewStub.id,
          userId: NON_EXISTENT_ID,
          ...createOrderProductReviewDtoStub,
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('404', async () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProductAndReview')
        .mockReturnValue(undefined);

      await expect(() =>
        orderService.createOrderProductReview({
          orderProductId: NON_EXISTENT_ID,
          userId: userStub.id,
          ...createOrderProductReviewDtoStub,
        }),
      ).rejects.toThrowError(new NotFoundException());
    });
  });
});
