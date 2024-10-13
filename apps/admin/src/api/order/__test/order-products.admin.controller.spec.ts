import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductsAdminService } from '../order-products/order-products.admin.service';
import { OrderProductsAdminController } from '../order-products/order-products.admin.controller';
import { OrderProductStatus } from '@domain/domain/order/order-product';
import { OrderModule } from '@domain/domain/order/order.module';

describe('OrderProductsAdminController', () => {
  let orderProductsAdminController: OrderProductsAdminController;
  let orderProductsAdminService: OrderProductsAdminService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
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

    orderProductsAdminController = app.get<OrderProductsAdminController>(
      OrderProductsAdminController,
    );
    orderProductsAdminService = app.get<OrderProductsAdminService>(
      OrderProductsAdminService,
    );
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
