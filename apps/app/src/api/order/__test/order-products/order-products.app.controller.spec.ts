import { Test } from '@nestjs/testing';
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

  it('postOrderProductConfirm', () => {
    const id = 1;

    orderProductsAppController.postOrderProductConfirm(id);

    expect(orderService.orderProductConfirm).toBeCalledWith(id);
  });
});
