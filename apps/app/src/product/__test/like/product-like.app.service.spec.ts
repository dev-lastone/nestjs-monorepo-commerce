import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@domain/domain/product/product.service';
import { ProductLikeAppService } from '../../like/product-like.app.service';
import { ProductLikeAppDto } from '../../like/product-like.app.dto';

describe('ProductLikeAppService', () => {
  let productLikeAppService: ProductLikeAppService;
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductLikeAppService,
        {
          provide: ProductService,
          useValue: {
            checkProductExist: jest.fn(),
          },
        },
      ],
    }).compile();

    productLikeAppService = app.get<ProductLikeAppService>(
      ProductLikeAppService,
    );
    productService = app.get<ProductService>(ProductService);
  });

  describe('productLike', () => {
    it('이미 좋아요', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      expect(() => productLikeAppService.productLike(dto)).toThrow(
        'Product already liked',
      );
      expect(productService.checkProductExist).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it('성공', () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      const result = productLikeAppService.productLike(dto);

      expect(productService.checkProductExist).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(true);
    });
  });
});
