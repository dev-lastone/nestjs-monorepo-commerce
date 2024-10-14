import { Test } from '@nestjs/testing';
import { ProductService } from '@domain/domain/product/product.service';
import { ProductLikeAppService } from '../../like/product-like.app.service';
import { ProductLikeAppDto } from '../../like/product-like.app.dto';

describe('ProductLikeAppService', () => {
  let productLikeAppService: ProductLikeAppService;
  let productService: ProductService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductLikeAppService,
        {
          provide: ProductService,
          useValue: {
            checkExistentProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    productLikeAppService = testingModule.get(ProductLikeAppService);
    productService = testingModule.get(ProductService);
  });

  describe('postProductLike', () => {
    it('이미 좋아요', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      expect(() => productLikeAppService.postProductLike(dto)).toThrow(
        'Product already liked',
      );
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it('성공', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      const result = productLikeAppService.postProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(true);
    });
  });

  describe('deleteProductLike', () => {
    it('좋아요 정보 없음.', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      expect(() => productLikeAppService.deleteProductLike(dto)).toThrow(
        'Product not liked',
      );
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it('성공', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      const result = productLikeAppService.deleteProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(false);
    });
  });
});
