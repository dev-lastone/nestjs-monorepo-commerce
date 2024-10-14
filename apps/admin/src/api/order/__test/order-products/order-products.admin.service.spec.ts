import { Test } from '@nestjs/testing';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { orderProductStub } from '@domain/domain/order/__stub/order-product.stub';
import { OrderProductsAdminService } from '../../order-products/order-products.admin.service';

describe('OrderProductsAdminService', () => {
  let orderProductsAdminService: OrderProductsAdminService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrderProductsAdminService,
        {
          provide: OrderRepo,
          useValue: {
            findOneProductById: jest.fn().mockReturnValue(orderProductStub),
            saveProduct: jest.fn().mockReturnValue(orderProductStub),
          },
        },
      ],
    }).compile();

    orderProductsAdminService = testingModule.get(OrderProductsAdminService);
    orderRepo = testingModule.get(OrderRepo);
  });

  it('patchOrderProduct', () => {
    const result = orderProductsAdminService.patchOrderProduct(1, {
      status: OrderProductStatus.ON_DELIVERY,
    });

    expect(orderRepo.findOneProductById).toBeCalledWith(1);
    expect(orderRepo.saveProduct).toBeCalled();
    expect(result).toEqual(orderProductStub);
  });
});
