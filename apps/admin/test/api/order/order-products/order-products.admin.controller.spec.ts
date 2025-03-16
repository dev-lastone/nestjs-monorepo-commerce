import { Test } from '@nestjs/testing';
import { OrderProductsAdminController } from '../../../../src/api/order/order-products/order-products.admin.controller';
import { OrderProductsAdminService } from '../../../../src/api/order/order-products/order-products.admin.service';

describe('OrderProductsAdminController', () => {
  let orderProductsAdminController: OrderProductsAdminController;
  let orderProductsAdminService: OrderProductsAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAdminController],
      providers: [
        {
          provide: OrderProductsAdminService,
          useValue: {
            postOrderProductDeliver: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminController = testingModule.get(
      OrderProductsAdminController,
    );
    orderProductsAdminService = testingModule.get(OrderProductsAdminService);
  });

  it('postOrderProductDeliver', () => {
    const id = 1;

    orderProductsAdminController.postOrderProductDeliver(id);

    expect(
      orderProductsAdminService.postOrderProductDeliver,
    ).toHaveBeenCalledWith(id);
  });
});
