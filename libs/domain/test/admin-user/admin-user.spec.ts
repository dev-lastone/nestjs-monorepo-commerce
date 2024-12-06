import { User } from '@domain/_vo/user';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { createUserDtoStub } from '../_vo/_stub/create-user.dto.stub';

describe('AdminUser', () => {
  it('create', async () => {
    const mockUserCreate = jest.spyOn(User, 'create');

    const adminUser = await AdminUser.create(createUserDtoStub);

    expect(adminUser).toBeInstanceOf(AdminUser);
    expect(mockUserCreate).toHaveBeenCalledWith(createUserDtoStub);
  });
});
