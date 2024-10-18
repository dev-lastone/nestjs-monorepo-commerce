import { Test } from '@nestjs/testing';
import { NON_EXISTENT_ID } from '@common/constant/constants';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { ProductRepo } from '@domain/product/product.repo';
import {
  productsStub,
  productStub1,
} from '@domain/product/__stub/product.stub';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@domain/product/product.dto';
import { ProductApplicationService } from '@application/product/product.application.service';

describe('ProductApplicationService', () => {
  let productApplicationService: ProductApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [ProductApplicationService, ProductRepo],
    }).compile();

    productApplicationService = testingModule.get(ProductApplicationService);
  });

  it('createProduct', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    expect(productApplicationService.createProduct(createProductDto)).toEqual({
      id: 3,
      ...createProductDto,
    });
  });

  it('findProducts', () => {
    expect(productApplicationService.findProducts()).toEqual(productsStub);
  });

  describe('updateProduct', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() =>
        productApplicationService.updateProduct(
          NON_EXISTENT_ID,
          updateProductDto,
        ),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      const id = 3;
      expect(
        productApplicationService.updateProduct(id, updateProductDto),
      ).toEqual({
        id,
        ...updateProductDto,
      });
    });
  });

  describe('deleteProduct', () => {
    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() =>
        productApplicationService.deleteProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      productApplicationService.deleteProduct(3);

      expect(productApplicationService.findProducts()).toEqual(productsStub);
    });
  });

  describe('checkExistentProduct', () => {
    it('실패', () => {
      expect(() =>
        productApplicationService.checkExistentProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      expect(
        productApplicationService.checkExistentProduct(productStub1.id),
      ).toBe(productStub1);
    });
  });
});
