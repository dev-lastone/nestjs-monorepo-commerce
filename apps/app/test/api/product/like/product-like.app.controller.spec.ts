import { Test } from '@nestjs/testing';
import { ProductLikeAppController } from '../../../../src/api/product/like/product-like.app.controller';
import { ProductLikeService } from '../../../../src/application/product/like/product-like.service';

describe('ProductLikeController', () => {
  let productLikeAppController: ProductLikeAppController;
  let productLikeService: ProductLikeService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductLikeAppController],
      providers: [
        {
          provide: ProductLikeService,
          useValue: {
            postProductLike: jest.fn().mockReturnValue(true),
            deleteProductLike: jest.fn().mockReturnValue(false),
          },
        },
      ],
    }).compile();

    productLikeAppController = testingModule.get(ProductLikeAppController);
    productLikeService = testingModule.get(ProductLikeService);
  });

  it('post', () => {
    productLikeAppController.postProductLike(2, 1);

    expect(productLikeService.postProductLike).toBeCalledWith({
      userId: 2,
      productId: 1,
    });
  });

  it('delete', () => {
    productLikeAppController.deleteProductLike(1, 1);

    expect(productLikeService.deleteProductLike).toBeCalledWith({
      userId: 1,
      productId: 1,
    });
  });
});
