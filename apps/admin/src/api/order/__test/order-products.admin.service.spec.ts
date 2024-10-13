import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductsAdminService } from '../order-products/order-products.admin.service';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { orderProductStub } from '@domain/domain/order/__stub/order-product.stub';

describe('OrderProductsAdminService', () => {
  let orderProductsAdminService: OrderProductsAdminService;
  let orderRepo: OrderRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    orderProductsAdminService = app.get<OrderProductsAdminService>(
      OrderProductsAdminService,
    );
    orderRepo = app.get<OrderRepo>(OrderRepo);
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
