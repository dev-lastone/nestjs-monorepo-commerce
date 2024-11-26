import { Test } from '@nestjs/testing';
import { OrderApplicationService } from '@application/order/order.application.service';
import { OrderProductsAdminController } from '../../../../src/api/order/order-products/order-products.admin.controller';

describe('OrderProductsAdminController', () => {
  let orderProductsAdminController: OrderProductsAdminController;
  let orderApplicationService: OrderApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAdminController],
      providers: [
        {
          provide: OrderApplicationService,
          useValue: {
            orderProductDeliver: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminController = testingModule.get(
      OrderProductsAdminController,
    );
    orderApplicationService = testingModule.get(OrderApplicationService);
  });

  it('postOrderProductDeliver', () => {
    const id = 1;

    orderProductsAdminController.postOrderProductDeliver(id);

    expect(orderApplicationService.orderProductDeliver).toBeCalledWith(id);
  });
});
