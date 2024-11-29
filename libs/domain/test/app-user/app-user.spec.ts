import { User } from '@domain/_vo/user';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { AppUser } from '@domain/app-user/app-user.entity';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';

describe('AppUser', () => {
  it('create', async () => {
    const dto: CreateUserDto = {
      name: '홍길동',
      email: 'test@test.com',
      password: 'string1234',
    };

    const mockUserCreate = jest.spyOn(User, 'create');

    const appUser = await AppUser.create(dto);

    expect(appUser).toBeInstanceOf(AppUser);
    expect(appUser.point).toBeInstanceOf(AppUserPoint);
    expect(mockUserCreate).toHaveBeenCalledWith(dto);
  });
});
