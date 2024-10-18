import { Test } from '@nestjs/testing';
import {
  productStub1,
  productStub2,
} from '@domain/product/__stub/product.stub';
import { OrderProductStatus } from '@domain/order/order-product';
import { orderStub } from '@domain/order/__stub/order.stub';
import { OrderModule } from '@domain/order/order.module';
import { ForbiddenException } from '@nestjs/common';
import { OrdersAppService } from '../../orders/orders.app.service';
import { UserAddressModule } from '../../../../domain/user/address/user-address.module';
import { ProductApplicationModule } from '@application/product/product.application.module';

describe('OrdersAppService', () => {
  let ordersAppService: OrdersAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [ProductApplicationModule, OrderModule, UserAddressModule],
      providers: [OrdersAppService],
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
      ).toThrowError(new ForbiddenException());
    });

    it('성공', () => {
      expect(
        ordersAppService.postOrder(1, {
          userAddressId: 1,
          productIds: [1, 2],
        }),
      ).toEqual({
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

  it('getOrders', () => {
    expect(ordersAppService.getOrders(1)).toEqual([orderStub]);
  });
});
