import { ProductLike } from '@domain/product/product-like.entity';
import { userStub } from '../user/stub/user.stub';
import { productStub1 } from './_stub/product.stub';

describe('ProductLike', () => {
  it('create', () => {
    const dto = {
      userId: userStub.id,
      product: productStub1,
    };

    const productLike = ProductLike.create(dto);

    expect(productLike).toBeInstanceOf(ProductLike);
    expect(productLike).toEqual(dto);
  });
});
