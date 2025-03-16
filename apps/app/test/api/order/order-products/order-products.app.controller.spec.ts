import { Test } from '@nestjs/testing';
import { OrderProductsAppController } from '../../../../src/api/order/order-products/order-products.app.controller';
import { appUserStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user.stub';
import { OrderProductsAppService } from '../../../../src/api/order/order-products/order-products.app.service';

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
            postOrderProductConfirm: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAppController = testingModule.get(OrderProductsAppController);
    orderProductsAppService = testingModule.get(OrderProductsAppService);
  });

  it('postOrderProductConfirm', () => {
    const id = 1;

    orderProductsAppController.postOrderProductConfirm(appUserStub.id, id);

    expect(
      orderProductsAppService.postOrderProductConfirm,
    ).toHaveBeenCalledWith({
      id,
      userId: appUserStub.id,
    });
  });
});
