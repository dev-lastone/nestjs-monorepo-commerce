import { Test } from '@nestjs/testing';
import { OrderService } from '@application/order/order.service';
import { OrderProductsAppController } from '../../../../src/api/order/order-products/order-products.app.controller';
import { appUserStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user.stub';

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

    orderProductsAppController.postOrderProductConfirm(appUserStub.id, id);

    expect(orderService.orderProductConfirm).toBeCalledWith({
      id,
      userId: appUserStub.id,
    });
  });
});
