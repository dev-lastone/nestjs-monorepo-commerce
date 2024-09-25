import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@domain/domain/product/product.service';
import { NON_EXISTENT_ID } from '@common/common/constant/constants';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  describe('checkExistentProduct', () => {
    it('실패', () => {
      expect(() =>
        productService.checkExistentProduct(NON_EXISTENT_ID),
      ).toThrow(ERROR_MESSAGES.ProductNotFound);
    });

    it('성공', () => {
      expect(productService.checkExistentProduct(1)).toBe(0);
    });
  });
});
