import { CreateProductDto } from '@domain/product/dto/product.dto';
import { Product } from '@domain/product/product.entity';

describe('Product', () => {
  it('create', () => {
    const dto: CreateProductDto = {
      name: '홍길동',
      price: 12000,
      stock: 10,
    };

    const product = Product.create(dto);

    expect(product).toBeInstanceOf(Product);
    expect(product).toEqual(dto);
  });
});
