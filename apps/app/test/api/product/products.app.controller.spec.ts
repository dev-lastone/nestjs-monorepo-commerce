import { Test } from '@nestjs/testing';
import { ProductsAppController } from '../../../src/api/product/products.app.controller';
import { ProductsAppRepo } from '../../../src/api/product/products.app.repo';

describe('ProductsAppController', () => {
  let productsAppController: ProductsAppController;
  let productsAppRepo: ProductsAppRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductsAppController],
      providers: [
        {
          provide: ProductsAppRepo,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAppController = testingModule.get(ProductsAppController);
    productsAppRepo = testingModule.get(ProductsAppRepo);
  });

  it('getProducts', () => {
    productsAppController.getProducts();

    expect(productsAppRepo.find).toBeCalled();
  });
});
