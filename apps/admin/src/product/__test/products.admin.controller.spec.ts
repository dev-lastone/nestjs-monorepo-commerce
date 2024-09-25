import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminController } from '../products.admin.controller';
import { ProductModule } from '@domain/domain/product/product.module';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

describe('ProductsAdminController', () => {
  let productsAdminController: ProductsAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [ProductsAdminController],
    }).compile();

    productsAdminController = app.get<ProductsAdminController>(
      ProductsAdminController,
    );
  });

  it('post', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;

    expect(productsAdminController.postProduct(createProductDto)).toEqual({
      id: 2,
      ...createProductDto,
    });
  });

  it('get', () => {
    expect(productsAdminController.getProducts()).toEqual([
      {
        id: 1,
        name: 'test1',
        price: 10000,
      },
    ]);
  });

  describe('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it('404', () => {
      expect(() =>
        productsAdminController.putProduct(NON_EXISTENT_ID, updateProductDto),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('200', () => {
      const id = 1;

      expect(productsAdminController.putProduct(id, updateProductDto)).toEqual({
        id,
        ...updateProductDto,
      });
    });
  });

  describe('delete', () => {
    it('404', () => {
      expect(() =>
        productsAdminController.deleteProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('200', () => {
      const id = 1;

      productsAdminController.deleteProduct(id);

      expect(productsAdminController.getProducts()).toEqual([]);
    });
  });
});
