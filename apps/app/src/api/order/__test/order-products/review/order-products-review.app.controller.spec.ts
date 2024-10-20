import { Test } from '@nestjs/testing';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { OrderApplicationService } from '@application/order/order.application.service';
import { OrderProductsReviewAppController } from '../../../order-products/review/order-products-review.app.controller';

describe('OrderProductsReviewAppController', () => {
  let orderProductsReviewAppController: OrderProductsReviewAppController;
  let orderApplicationService: OrderApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsReviewAppController],
      providers: [
        {
          provide: OrderApplicationService,
          useValue: {
            createOrderProductReview: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsReviewAppController = testingModule.get(
      OrderProductsReviewAppController,
    );
    orderApplicationService = testingModule.get(OrderApplicationService);
  });

  it('postOrderProductConfirm', () => {
    const id = 1;
    const dto = { score: 5, description: '내용' };

    orderProductsReviewAppController.postOrderProductsReview(
      appUserStub.id,
      id,
      dto,
    );

    expect(orderApplicationService.createOrderProductReview).toBeCalledWith({
      orderProductId: 1,
      userId: appUserStub.id,
      ...dto,
    });
  });
});
