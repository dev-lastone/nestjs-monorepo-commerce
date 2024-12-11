import { Test } from '@nestjs/testing';
import { ProductService } from '@application/product/product.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { ProductLike } from '@domain/product/product-like.entity';
import { ProductLikeRepo } from '../../../../../src/application/product/like/product-like.repo';
import { ProductLikeService } from '../../../../../src/application/product/like/product-like.service';
import { ProductLikeDto } from '../../../../../src/application/product/like/product-like.dto';

describe('ProductLikeAppService', () => {
  let productLikeService: ProductLikeService;
  let productService: ProductService;
  let productLikeRepo: ProductLikeRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductLikeService,
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

    productLikeService = testingModule.get(ProductLikeService);
    productService = testingModule.get(ProductService);
    productLikeRepo = testingModule.get(ProductLikeRepo);
  });

  describe('postProductLike', () => {
    it(ERROR_MESSAGES.ProductAlreadyLiked, () => {
      const dto = new ProductLikeDto();
      dto.productId = 1;
      dto.userId = 1;

      const productLike = ProductLike.create(dto);
      jest.spyOn(productLikeRepo, 'findOne').mockResolvedValue(productLike);

      expect(() => productLikeService.postProductLike(dto)).rejects.toThrow(
        ERROR_MESSAGES.ProductAlreadyLiked,
      );
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeDto();
      dto.productId = 1;
      dto.userId = 2;

      const result = await productLikeService.postProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(true);
    });
  });

  describe('deleteProductLike', () => {
    it(ERROR_MESSAGES.ProductNotLiked, () => {
      const dto = new ProductLikeDto();
      dto.productId = 1;
      dto.userId = 2;

      expect(() => productLikeService.deleteProductLike(dto)).rejects.toThrow(
        ERROR_MESSAGES.ProductNotLiked,
      );
      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeDto();
      dto.productId = 1;
      dto.userId = 1;

      const productLike = ProductLike.create(dto);
      jest.spyOn(productLikeRepo, 'findOne').mockResolvedValue(productLike);

      const result = await productLikeService.deleteProductLike(dto);

      expect(productService.checkExistentProduct).toHaveBeenCalledWith(
        dto.productId,
      );
      expect(result).toBe(false);
    });
  });
});
