import { Test } from '@nestjs/testing';
import { ProductLikeAppController } from '../../like/product-like.app.controller';
import { ProductLikeAppService } from '../../like/product-like.app.service';

describe('ProductLikeController', () => {
  let productLikeAppController: ProductLikeAppController;
  let productLikeAppService: ProductLikeAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [ProductLikeAppController],
      providers: [
        {
          provide: ProductLikeAppService,
          useValue: {
            postProductLike: jest.fn().mockReturnValue(true),
            deleteProductLike: jest.fn().mockReturnValue(false),
          },
        },
      ],
    }).compile();

    productLikeAppController = testingModule.get(ProductLikeAppController);
    productLikeAppService = testingModule.get(ProductLikeAppService);
  });

  it('post', () => {
    productLikeAppController.postProductLike(2, 1);

    expect(productLikeAppService.postProductLike).toBeCalledWith({
      userId: 2,
      productId: 1,
    });
  });

  it('delete', () => {
    productLikeAppController.deleteProductLike(1, 1);

    expect(productLikeAppService.deleteProductLike).toBeCalledWith({
      userId: 1,
      productId: 1,
    });
  });
});
