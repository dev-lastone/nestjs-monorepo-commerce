import { Test } from '@nestjs/testing';
import { ProductLikeAppService } from '../../like/product-like.app.service';
import { ProductLikeAppDto } from '../../like/product-like.app.dto';
import { ProductApplicationService } from '@application/product/product.application.service';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { ProductLikeRepo } from '@domain/product/like/product-like.repo';
import { ProductLike } from '@domain/product/like/product-like.entity';

describe('ProductLikeAppService', () => {
  let productLikeAppService: ProductLikeAppService;
  let productApplicationService: ProductApplicationService;
  let productLikeRepo: ProductLikeRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        ProductLikeAppService,
        {
          provide: ProductApplicationService,
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
    productApplicationService = testingModule.get(ProductApplicationService);
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
      expect(
        productApplicationService.checkExistentProduct,
      ).toHaveBeenCalledWith(dto.productId);
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 2;

      const result = await productLikeAppService.postProductLike(dto);

      expect(
        productApplicationService.checkExistentProduct,
      ).toHaveBeenCalledWith(dto.productId);
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
      expect(
        productApplicationService.checkExistentProduct,
      ).toHaveBeenCalledWith(dto.productId);
    });

    it(SUCCESS, async () => {
      const dto = new ProductLikeAppDto();
      dto.productId = 1;
      dto.userId = 1;

      const productLike = ProductLike.create(dto);
      jest.spyOn(productLikeRepo, 'findOne').mockResolvedValue(productLike);

      const result = await productLikeAppService.deleteProductLike(dto);

      expect(
        productApplicationService.checkExistentProduct,
      ).toHaveBeenCalledWith(dto.productId);
      expect(result).toBe(false);
    });
  });
});
