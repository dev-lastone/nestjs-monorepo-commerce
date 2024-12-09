import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { User } from '@domain/user/user';
import { createUserDtoStub } from '../user/stub/dto/create-user.dto.stub';

describe('AdminUser', () => {
  it('create', async () => {
    const mockUserCreate = jest.spyOn(User, 'create');

    const adminUser = await AdminUser.create(createUserDtoStub);

    expect(adminUser).toBeInstanceOf(AdminUser);
    expect(mockUserCreate).toHaveBeenCalledWith(createUserDtoStub);
  });
});
