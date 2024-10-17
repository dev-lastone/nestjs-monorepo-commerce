import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderProductsAppController } from '../../order-products/order-products.app.controller';
import { OrderService } from '@domain/domain/order/order.service';

describe('OrderProductsAppController', () => {
  let orderProductsAppController: OrderProductsAppController;
  let orderService: OrderService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAppController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            patchOrderProduct: jest.fn(),
            orderProductConfirm: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAppController = testingModule.get(OrderProductsAppController);
    orderService = testingModule.get(OrderService);
  });

  it('patchOrderProduct', () => {
    const id = 1;
    const dto = {
      status: OrderProductStatus.CONFIRMED,
    };

    orderProductsAppController.patchOrderProduct(id, dto);

    expect(orderService.patchOrderProduct).toBeCalledWith(id, dto);
  });

  it('postOrderProductConfirm', () => {
    const id = 1;

    orderProductsAppController.postOrderProductConfirm(id);

    expect(orderService.orderProductConfirm).toBeCalledWith(id);
  });
});
