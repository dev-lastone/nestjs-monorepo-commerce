import { Test } from '@nestjs/testing';
import { ProductService } from '@application/product/product.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { ProductLikeRepo } from '@application/product/like/product-like.repo';
import { ProductLike } from '@domain/product/product-like.entity';
import { ProductLikeAppService } from '../../../../src/api/product/like/product-like.app.service';
import { ProductLikeAppDto } from '../../../../src/api/product/like/product-like.app.dto';

describe('ProductLikeAppService', () => {
  let productLikeAppService: ProductLikeAppService;
  let productService: ProductService;
  let productLikeRepo: ProductLikeRepo;

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
        {
          provide: ProductLikeRepo,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productLikeAppService = testingModule.get(ProductLikeAppService);
    productService = testingModule.get(ProductService);
    productLikeRepo = testingModule.get(ProductLikeRepo);
  });

  describe('postProductLike', () => {
    it(ERROR_MESSAGES.ProductAlreadyLiked, () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      const productLike = ProductLike.create(dto);
      jest.spyOn(productLikeRepo, 'findOne').mockResolvedValue(productLike);

      expect(() => productLikeAppService.postProductLike(dto)).rejects.toThrow(
        ERROR_MESSAGES.ProductAlreadyLiked,
      );
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      const result = await productLikeAppService.postProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(true);
    });
  });

  describe('deleteProductLike', () => {
    it(ERROR_MESSAGES.ProductNotLiked, () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      expect(() =>
        productLikeAppService.deleteProductLike(dto),
      ).rejects.toThrow(ERROR_MESSAGES.ProductNotLiked);
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      const productLike = ProductLike.create(dto);
      jest.spyOn(productLikeRepo, 'findOne').mockResolvedValue(productLike);

      const result = await productLikeAppService.deleteProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(false);
    });
  });
});
