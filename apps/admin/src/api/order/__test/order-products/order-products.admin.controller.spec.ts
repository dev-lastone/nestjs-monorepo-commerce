import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderProductsAdminController } from '../../order-products/order-products.admin.controller';
import { OrderService } from '@domain/domain/order/order.service';

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
            patchOrderProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminController = testingModule.get(
      OrderProductsAdminController,
    );
    orderService = testingModule.get(OrderService);
  });

  it('patchOrderProduct', () => {
    const id = 1;
    const dto = {
      status: OrderProductStatus.ON_DELIVERY,
    };

    orderProductsAdminController.patchOrderProduct(id, dto);

    expect(orderService.patchOrderProduct).toBeCalledWith(id, dto);
  });
});
