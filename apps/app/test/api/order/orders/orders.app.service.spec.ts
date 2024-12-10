import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { ForbiddenException } from '@nestjs/common';
import { ProductService } from '@application/product/product.service';
import { AppUserAddressRepo } from '@application/app-user/address/app-user-address.repo';
import { OrdersAppService } from '../../../../src/api/order/orders/orders.app.service';
import {
  productStub1,
  productStub2,
} from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { orderStub } from '../../../../../../libs/domain/test/order/_stub/order.stub';
import { OrdersAppRepo } from '../../../../src/api/order/orders/orders.app.repo';
import { OrderService } from '@application/order/order.service';

describe('OrdersAppService', () => {
  let ordersAppService: OrdersAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrdersAppService,
        {
          provide: ProductService,
          useValue: {
            findOneProduct: jest.fn().mockReturnValue(productStub1),
          },
        },
        {
          provide: AppUserAddressRepo,
          useValue: {
            findOneById: jest.fn().mockReturnValue({
              id: 1,
              userId: 1,
              zipcode: '01234',
              address: '서울시 강남구 역삼동 *********',
            }),
          },
        },
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockReturnValue({
              id: 2,
              userId: 1,
              zipcode: '01234',
              address: '서울시 강남구 역삼동 *********',
              products: [
                {
                  id: 2,
                  orderId: 2,
                  productId: productStub1.id,
                  name: productStub1.name,
                  price: productStub1.price,
                  status: OrderProductStatus.ORDERED,
                },
                {
                  id: 3,
                  orderId: 2,
                  productId: productStub2.id,
                  name: productStub2.name,
                  price: productStub2.price,
                  status: OrderProductStatus.ORDERED,
                },
              ],
            }),
          },
        },
        {
          provide: OrdersAppRepo,
          useValue: {
            findByUserId: jest.fn().mockReturnValue([orderStub]),
          },
        },
      ],
    }).compile();

    ordersAppService = testingModule.get(OrdersAppService);
  });

  describe('postOrder', () => {
    it('403', () => {
      expect(() =>
        ordersAppService.postOrder(2, {
          userAddressId: 1,
          productIds: [1, 2],
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      const result = await ordersAppService.postOrder(1, {
        userAddressId: 1,
        productIds: [1, 2],
      });
      expect(result).toEqual({
        id: 2,
        userId: 1,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
        products: [
          {
            id: 2,
            orderId: 2,
            productId: productStub1.id,
            name: productStub1.name,
            price: productStub1.price,
            status: OrderProductStatus.ORDERED,
          },
          {
            id: 3,
            orderId: 2,
            productId: productStub2.id,
            name: productStub2.name,
            price: productStub2.price,
            status: OrderProductStatus.ORDERED,
          },
        ],
      });
    });
  });

  it('getOrders', async () => {
    const result = await ordersAppService.getOrders(1);
    expect(result).toEqual([orderStub]);
  });
});
