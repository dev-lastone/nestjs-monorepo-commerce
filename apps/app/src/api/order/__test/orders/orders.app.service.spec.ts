import { Test } from '@nestjs/testing';
import {
  productStub1,
  productStub2,
} from '@domain/product/__stub/product.stub';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { orderStub } from '@domain/order/__stub/order.stub';
import { ForbiddenException } from '@nestjs/common';
import { OrdersAppService } from '../../orders/orders.app.service';
import { ProductApplicationService } from '@application/product/product.application.service';
import { UserAddressRepo } from '../../../../domain/user/address/user-address.repo';
import { OrderRepo } from '@domain/order/order.repo';

describe('OrdersAppService', () => {
  let ordersAppService: OrdersAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrdersAppService,
        {
          provide: ProductApplicationService,
          useValue: {
            findOneProduct: jest.fn().mockReturnValue(productStub1),
          },
        },
        {
          provide: UserAddressRepo,
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
          provide: OrderRepo,
          useValue: {
            save: jest.fn().mockReturnValue({
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
