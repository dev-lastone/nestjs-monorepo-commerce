import { Test } from '@nestjs/testing';
import { ProductsAppController } from '../products.app.controller';
import { ProductService } from '@domain/product/product.service';

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
