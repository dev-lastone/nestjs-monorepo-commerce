import { CreateUserCartDto } from '@domain/app-user/dto/user-cart.dto';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { productStub2 } from '../product/_stub/product.stub';

describe('AppUserCart', () => {
  it('create', async () => {
    const dto: CreateUserCartDto = {
      userId: 1,
      product: productStub2,
      count: 3,
    };

    const userCart = AppUserCart.create(dto);

    expect(userCart).toBeInstanceOf(AppUserCart);
    expect(userCart).toEqual(dto);
  });
});
