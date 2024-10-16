import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { orderProductStub } from '@domain/domain/order/__stub/order-product.stub';
import { OrderProductsAppService } from '../../order-products/order-products.app.service';

describe('OrderProductsAppService', () => {
  let orderProductsAppService: OrderProductsAppService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderProductsAppService,
        {
          provide: OrderRepo,
          useValue: {
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
          },
        },
      ],
    }).compile();

    orderProductsAppService = testingModule.get(OrderProductsAppService);
    orderRepo = testingModule.get(OrderRepo);
  });

  it('patchOrderProduct', () => {
    const result = orderProductsAppService.patchOrderProduct(1, {
      status: OrderProductStatus.CONFIRMED,
    });

    expect(orderRepo.findOneProductById).toBeCalledWith(1);
    expect(orderRepo.saveProduct).toBeCalled();
    expect(result).toEqual(orderProductStub);
  });
});
