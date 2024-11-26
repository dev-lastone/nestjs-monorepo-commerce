import { Test } from '@nestjs/testing';
import { OrderApplicationService } from '@application/order/order.application.service';
import { OrderProductsAppController } from '../../../../src/api/order/order-products/order-products.app.controller';
import { appUserStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user.stub';

describe('OrderProductsAppController', () => {
  let orderProductsAppController: OrderProductsAppController;
  let orderApplicationService: OrderApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsAppController],
      providers: [
        {
          provide: OrderApplicationService,
          useValue: {
            patchOrderProduct: jest.fn(),
            orderProductConfirm: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsAppController = testingModule.get(OrderProductsAppController);
    orderApplicationService = testingModule.get(OrderApplicationService);
  });

  it('postOrderProductConfirm', () => {
    const id = 1;

    orderProductsAppController.postOrderProductConfirm(appUserStub.id, id);

    expect(orderApplicationService.orderProductConfirm).toBeCalledWith({
      id,
      userId: appUserStub.id,
    });
  });
});
