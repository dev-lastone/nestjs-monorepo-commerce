import { Test } from '@nestjs/testing';
import { OrderService } from '@application/order/order.service';
import { OrderProductsAdminController } from '../../../../src/api/order/order-products/order-products.admin.controller';

describe('OrderProductsAdminController', () => {
  let orderProductsAdminController: OrderProductsAdminController;
  let orderService: OrderService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAdminController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            orderProductDeliver: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminController = testingModule.get(
      OrderProductsAdminController,
    );
    orderService = testingModule.get(OrderService);
  });

  it('postOrderProductDeliver', () => {
    const id = 1;

    orderProductsAdminController.postOrderProductDeliver(id);

    expect(orderService.orderProductDeliver).toBeCalledWith(id);
  });
});
