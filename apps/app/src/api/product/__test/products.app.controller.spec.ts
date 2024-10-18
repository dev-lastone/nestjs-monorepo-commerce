import { Test } from '@nestjs/testing';
import { ProductsAppController } from '../products.app.controller';
import { ProductApplicationService } from '@application/product/product.application.service';

describe('ProductsAppController', () => {
  let productsAppController: ProductsAppController;
  let productApplicationService: ProductApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAppController],
      providers: [
        {
          provide: ProductApplicationService,
          useValue: {
            findProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAppController = testingModule.get(ProductsAppController);
    productApplicationService = testingModule.get(ProductApplicationService);
  });

  it('getProducts', () => {
    productsAppController.getProducts();

    expect(productApplicationService.findProducts).toBeCalled();
  });
});
