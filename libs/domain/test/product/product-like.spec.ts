import { ProductLike } from '@domain/product/product-like.entity';

describe('ProductLike', () => {
  it('create', () => {
    const dto = {
      userId: 1,
      productId: 1,
    };

    const productLike = ProductLike.create(dto);

    expect(productLike).toBeInstanceOf(ProductLike);
    expect(productLike).toEqual(dto);
  });
});
