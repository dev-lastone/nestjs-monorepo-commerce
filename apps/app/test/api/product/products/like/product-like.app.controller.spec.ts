import { Test } from '@nestjs/testing';
import { ProductLikeAppController } from '../../../../../src/api/product/products/like/product-like.app.controller';
import { ProductLikeService } from '../../../../../src/application/product/like/product-like.service';
import { productStub1 } from '../../../../../../../libs/domain/test/product/_stub/product.stub';
import { userStub } from '../../../../../../../libs/domain/test/user/stub/user.stub';

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
    productLikeAppController.postProductLike(2n, productStub1.id);

    expect(productLikeService.postProductLike).toBeCalledWith({
      userId: 2n,
      productId: productStub1.id,
    });
  });

  it('delete', () => {
    productLikeAppController.deleteProductLike(userStub.id, productStub1.id);

    expect(productLikeService.deleteProductLike).toBeCalledWith({
      userId: userStub.id,
      productId: productStub1.id,
    });
  });
});
