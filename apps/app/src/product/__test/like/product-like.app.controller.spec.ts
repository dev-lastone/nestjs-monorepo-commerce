import { Test, TestingModule } from '@nestjs/testing';
import { ProductLikeAppController } from '../../like/product-like.app.controller';
import { ProductModule } from '@domain/domain/product/product.module';
import { ProductLikeAppService } from '../../like/product-like.app.service';

describe('ProductLikeController', () => {
  let productLikeAppController: ProductLikeAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      controllers: [ProductLikeAppController],
      providers: [ProductLikeAppService],
    }).compile();

    productLikeAppController = app.get<ProductLikeAppController>(
      ProductLikeAppController,
    );
  });

  it('post', () => {
    const req = {
      user: {
        sub: 2,
      },
    };

    expect(productLikeAppController.postProductLike(req, 1)).toBe(true);
  });

  it('delete', () => {
    const req = {
      user: {
        sub: 1,
      },
    };

    expect(productLikeAppController.deleteProductLike(req, 1)).toBe(false);
  });
});
