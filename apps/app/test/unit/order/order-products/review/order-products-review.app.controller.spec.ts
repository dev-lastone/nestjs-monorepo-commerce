import { Test } from '@nestjs/testing';
import { OrderService } from '@application/order/order.service';
import { OrderProductsReviewAppController } from '../../../../../src/api/order/order-products/review/order-products-review.app.controller';
import { appUserStub } from '../../../../../../../libs/domain/test/app-user/_stub/app-user.stub';

describe('OrderProductsReviewAppController', () => {
  let orderProductsReviewAppController: OrderProductsReviewAppController;
  let orderService: OrderService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrderProductsReviewAppController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrderProductReview: jest.fn(),
          },
        },
      ],
    }).compile();

    orderProductsReviewAppController = testingModule.get(
      OrderProductsReviewAppController,
    );
    orderService = testingModule.get(OrderService);
  });

  it('postOrderProductConfirm', () => {
    const id = 1;
    const dto = { score: 5, description: '내용' };

    orderProductsReviewAppController.postOrderProductsReview(
      appUserStub.id,
      id,
      dto,
    );

    expect(orderService.createOrderProductReview).toBeCalledWith({
      orderProductId: 1,
      userId: appUserStub.id,
      ...dto,
    });
  });
});
