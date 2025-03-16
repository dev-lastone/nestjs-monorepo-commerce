import { Test } from '@nestjs/testing';
import { ProductsAppRepo } from '../../../../src/api/product/products/products.app.repo';
import { ProductsAppService } from '../../../../src/api/product/products/products.app.service';

describe('ProductsAppService', () => {
  let productsAppService: ProductsAppService;
  let productsAppRepo: ProductsAppRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductsAppService,
        {
          provide: ProductsAppRepo,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    productsAppService = testingModule.get(ProductsAppService);
    productsAppRepo = testingModule.get(ProductsAppRepo);
  });

  it('getProducts', () => {
    productsAppService.getProducts();

    expect(productsAppRepo.find).toHaveBeenCalled();
  });
});
