import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/order/order-product.entity';
import { ForbiddenException } from '@nestjs/common';
import { ProductService } from '@application/product/product.service';
import { OrdersAppService } from '../../../../src/api/order/orders/orders.app.service';
import {
  productStub1,
  productStub2,
} from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { orderStub } from '../../../../../../libs/domain/test/order/_stub/order.stub';
import { OrdersAppRepo } from '../../../../src/api/order/orders/orders.app.repo';
import { OrderService } from '@application/order/order.service';
import { UserAddressService } from '../../../../src/application/user/address/user-address.service';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';

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
          provide: UserAddressService,
          useValue: {
            getUserAddressById: jest.fn().mockReturnValue({
              id: 1n,
              userId: userStub.id,
              zipcode: '01234',
              address: '서울시 강남구 역삼동 *********',
            }),
          },
        },
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockReturnValue({
              id: 2n,
              userId: userStub.id,
              zipcode: '01234',
              address: '서울시 강남구 역삼동 *********',
              products: [
                {
                  id: 2n,
                  orderId: 2n,
                  productId: productStub1.id,
                  name: productStub1.name,
                  price: productStub1.price,
                  status: OrderProductStatus.ORDERED,
                },
                {
                  id: 3n,
                  orderId: 2n,
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
        ordersAppService.postOrder(2n, {
          userAddressId: 1n,
          productIds: [1n, 2n],
        }),
      ).rejects.toThrowError(new ForbiddenException());
    });

    it('성공', async () => {
      const result = await ordersAppService.postOrder(userStub.id, {
        userAddressId: 1n,
        productIds: [productStub1.id, productStub2.id],
      });
      expect(result).toEqual({
        id: 2n,
        userId: userStub.id,
        zipcode: '01234',
        address: '서울시 강남구 역삼동 *********',
        products: [
          {
            id: 2n,
            orderId: 2n,
            productId: productStub1.id,
            name: productStub1.name,
            price: productStub1.price,
            status: OrderProductStatus.ORDERED,
          },
          {
            id: 3n,
            orderId: 2n,
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
    const result = await ordersAppService.getOrders(userStub.id);
    expect(result).toEqual([orderStub]);
  });
});
