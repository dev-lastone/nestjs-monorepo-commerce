import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderProductsAdminController } from '../../order-products/order-products.admin.controller';
import { OrderProductsAdminService } from '../../order-products/order-products.admin.service';

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
            patchOrderProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAdminController = testingModule.get(
      OrderProductsAdminController,
    );
    orderProductsAdminService = testingModule.get(OrderProductsAdminService);
  });

  it('patchOrderProduct', () => {
    const id = 1;
    const dto = {
      status: OrderProductStatus.ON_DELIVERY,
    };

    orderProductsAdminController.patchOrderProduct(id, dto);

    expect(orderProductsAdminService.patchOrderProduct).toBeCalledWith(id, dto);
  });
});
