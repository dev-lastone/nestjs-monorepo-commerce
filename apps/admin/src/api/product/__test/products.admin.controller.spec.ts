import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminController } from '../products.admin.controller';
import { ProductModule } from '@domain/domain/product/product.module';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/domain/product/product.dto';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { productsStub } from '@domain/domain/product/__stub/product.stub';

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
    createProductDto.stock = 20;

    expect(productsAdminController.postProduct(createProductDto)).toEqual({
      id: 3,
      ...createProductDto,
    });
  });

  it('get', () => {
    expect(productsAdminController.getProducts()).toEqual(productsStub);
  });

  describe('put', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() =>
        productsAdminController.putProduct(NON_EXISTENT_ID, updateProductDto),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      const id = 3;
      expect(productsAdminController.putProduct(id, updateProductDto)).toEqual({
        id,
        ...updateProductDto,
      });
    });
  });

  describe('delete', () => {
    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() =>
        productsAdminController.deleteProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      productsAdminController.deleteProduct(3);

      expect(productsAdminController.getProducts()).toEqual(productsStub);
    });
  });
});
