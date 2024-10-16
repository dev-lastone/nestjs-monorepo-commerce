import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderProductsAppController } from '../../products/order-products.app.controller';
import { OrderProductsAppService } from '../../products/order-products.app.service';

describe('OrderProductsAppController', () => {
  let orderProductsAppController: OrderProductsAppController;
  let orderProductsAppService: OrderProductsAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAppController],
      providers: [
        {
          provide: OrderProductsAppService,
          useValue: {
            patchOrderProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAppController = testingModule.get(OrderProductsAppController);
    orderProductsAppService = testingModule.get(OrderProductsAppService);
  });

  it('patchOrderProduct', () => {
    const id = 1;
    const dto = {
      status: OrderProductStatus.CONFIRMED,
    };

    orderProductsAppController.patchOrderProduct(id, dto);

    expect(orderProductsAppService.patchOrderProduct).toBeCalledWith(id, dto);
  });
});
