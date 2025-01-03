import { Test } from '@nestjs/testing';
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
  orderProductWithOrderAndProductAndReviewStub,
  orderProductWithOrderAndProductStub,
} from '../../../domain/test/order/_stub/order-product.stub';
import { userStub } from '../../../domain/test/user/stub/user.stub';
import { productStub1 } from '../../../domain/test/product/_stub/product.stub';
import { UserAddressService } from '../../../../apps/app/src/application/user/address/user-address.service';
import { ProductService } from '@application/product/product.service';
import { orderStub } from '../../../domain/test/order/_stub/order.stub';
import { appUserAddressStub } from '../../../domain/test/app-user/_stub/app-user-address.stub';
import { configModule } from '@common/setting/config';
import { typeOrmSetting } from '@common/setting/type-orm.setting';
import { orderProductReviewStub } from '../../../domain/test/order/_stub/order-product-review.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { OrderProductStatus } from '@domain/order/order-product.entity';

describe('OrderService', () => {
  let orderService: OrderService;
  let userAddressService: UserAddressService;
  let productService: ProductService;
  let appUserPointService: AppUserPointService;
  let orderRepo: OrderRepo;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [configModule(), typeOrmSetting()],
      providers: [
        OrderService,
        {
          provide: OrderRepo,
          useValue: {
            save: jest.fn().mockReturnValue(orderStub),
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
            findOneOrderProductWithOrderAndProduct: jest.fn(),
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
            savePoint: jest.fn(),
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
          userId: 2n,
          userAddressId: 1n,
          productIds: [1n],
        }),
      ).rejects.toThrowError(new ForbiddenException());
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

      // const order = Order.create(appUserAddressStub, [productStub1]);
      // expect(orderRepo.save).toBeCalledWith(orderStub);
      expect(result).toEqual(orderStub);
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
  });

  describe('orderProductDeliver', () => {
    it(SUCCESS, async () => {
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

    it('not found', () => {
      jest.spyOn(orderRepo, 'findOneProductById').mockReturnValue(undefined);

      expect(() =>
        orderService.orderProductDeliver(NON_EXISTENT_ID),
      ).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('orderProductConfirm', () => {
    it('성공', async () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockResolvedValue(orderProductWithOrderAndProductStub);

      const result = await orderService.orderProductConfirm({
        id: orderProductWithOrderAndProductStub.id,
        userId: userStub.id,
      });

      expect(orderRepo.findOneOrderProductWithOrderAndProduct).toBeCalledWith(
        1n,
      );
      expect(orderRepo.saveProduct).toBeCalled();
      expect(appUserPointService.savePoint).toBeCalled();
      expect(result).toEqual(orderProductWithOrderAndProductStub);
    });

    it('403', async () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockResolvedValue(orderProductWithOrderAndProductStub);

      await expect(() =>
        orderService.orderProductConfirm({
          id: orderProductWithOrderAndProductStub.id,
          userId: NON_EXISTENT_ID,
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('404', () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProduct')
        .mockReturnValue(undefined);

      expect(() =>
        orderService.orderProductConfirm({
          id: NON_EXISTENT_ID,
          userId: userStub.id,
        }),
      ).rejects.toThrowError(new NotFoundException());
    });
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

      expect(
        orderRepo.findOneOrderProductWithOrderAndProductAndReview,
      ).toBeCalledWith(orderProductWithOrderAndProductAndReviewStub.id);
      expect(orderRepo.saveProductReview).toBeCalled();
      expect(appUserPointService.savePoint).toBeCalled();
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

    it('404', () => {
      jest
        .spyOn(orderRepo, 'findOneOrderProductWithOrderAndProductAndReview')
        .mockReturnValue(undefined);

      expect(() =>
        orderService.createOrderProductReview({
          orderProductId: NON_EXISTENT_ID,
          userId: userStub.id,
          ...createOrderProductReviewDtoStub,
        }),
      ).rejects.toThrowError(new NotFoundException());
    });
  });
});
