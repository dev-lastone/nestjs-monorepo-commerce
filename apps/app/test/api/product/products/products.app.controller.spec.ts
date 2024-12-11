import { Test } from '@nestjs/testing';
import { ProductsAppController } from '../../../../src/api/product/products/products.app.controller';
import { ProductsAppService } from '../../../../src/api/product/products/products.app.service';

describe('ProductsAppController', () => {
  let productsAppController: ProductsAppController;
  let productsAppService: ProductsAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAppController],
      providers: [
        {
          provide: ProductsAppService,
          useValue: {
            getProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAppController = testingModule.get(ProductsAppController);
    productsAppService = testingModule.get(ProductsAppService);
  });

  it('getProducts', () => {
    productsAppController.getProducts();

    expect(productsAppService.getProducts).toBeCalled();
  });
});
