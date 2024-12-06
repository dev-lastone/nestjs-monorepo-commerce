import { Test } from '@nestjs/testing';
import { ProductService } from '@application/product/product.service';
import { ProductsAppController } from '../../../src/api/product/products.app.controller';

describe('ProductsAppController', () => {
  let productsAppController: ProductsAppController;
  let productService: ProductService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAppController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAppController = testingModule.get(ProductsAppController);
    productService = testingModule.get(ProductService);
  });

  it('getProducts', () => {
    productsAppController.getProducts();

    expect(productService.findProducts).toBeCalled();
  });
});
