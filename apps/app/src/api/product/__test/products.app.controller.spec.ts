import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAppController } from '../products.app.controller';
import { ProductModule } from '@domain/domain/product/product.module';

describe('ProductsAppController', () => {
  let productsAppController: ProductsAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [ProductsAppController],
    }).compile();

    productsAppController = app.get<ProductsAppController>(
      ProductsAppController,
    );
  });

  it('get', () => {
    expect(productsAppController.getProducts()).toEqual([
      {
        id: 1,
        name: 'test1',
        price: 10000,
      },
    ]);
  });
});
