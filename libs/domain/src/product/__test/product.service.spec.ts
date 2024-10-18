import { Test } from '@nestjs/testing';
import { ProductService } from '@domain/product/product.service';
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

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepo],
    }).compile();

    productService = testingModule.get(ProductService);
  });

  it('createProduct', () => {
    const createProductDto = new CreateProductDto();
    createProductDto.name = 'test2';
    createProductDto.price = 20000;
    createProductDto.stock = 20;

    expect(productService.createProduct(createProductDto)).toEqual({
      id: 3,
      ...createProductDto,
    });
  });

  it('findProducts', () => {
    expect(productService.findProducts()).toEqual(productsStub);
  });

  describe('updateProduct', () => {
    const updateProductDto = new UpdateProductDto();
    updateProductDto.name = '상품2';
    updateProductDto.price = 15000;

    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() =>
        productService.updateProduct(NON_EXISTENT_ID, updateProductDto),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      const id = 3;
      expect(productService.updateProduct(id, updateProductDto)).toEqual({
        id,
        ...updateProductDto,
      });
    });
  });

  describe('deleteProduct', () => {
    it(ERROR_MESSAGES.ProductNotFound, () => {
      expect(() => productService.deleteProduct(NON_EXISTENT_ID)).toThrow(
        ERROR_MESSAGES.ProductNotFound,
      );
    });

    it('성공', () => {
      productService.deleteProduct(3);

      expect(productService.findProducts()).toEqual(productsStub);
    });
  });

  describe('checkExistentProduct', () => {
    it('실패', () => {
      expect(() =>
        productService.checkExistentProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      expect(productService.checkExistentProduct(productStub1.id)).toBe(
        productStub1,
      );
    });
  });
});
