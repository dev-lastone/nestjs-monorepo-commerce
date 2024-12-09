import { AppUser } from '@domain/app-user/app-user.entity';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { User } from '@domain/user/user';
import { createUserDtoStub } from '../user/stub/dto/create-user.dto.stub';

describe('AppUser', () => {
  it('create', async () => {
    const mockUserCreate = jest.spyOn(User, 'create');

    const appUser = await AppUser.create(createUserDtoStub);

    expect(appUser).toBeInstanceOf(AppUser);
    expect(appUser.point).toBeInstanceOf(AppUserPoint);
    expect(mockUserCreate).toHaveBeenCalledWith(createUserDtoStub);
  });
});
