import { CreateUserCartDto } from '@domain/app-user/dto/user-cart.dto';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';

describe('AppUserCart', () => {
  it('create', async () => {
    const dto: CreateUserCartDto = {
      userId: 1,
      productId: 2,
      count: 3,
    };

    const userCart = await AppUserCart.create(dto);

    expect(userCart).toBeInstanceOf(AppUserCart);
    expect(userCart).toEqual(dto);
  });
});
