import { User } from '@domain/user/user';
import { AdminUser } from '../../../src/domain/admin-user/admin-user.entity';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';

describe('AdminUser', () => {
  it('create', async () => {
    const mockUserCreate = jest.spyOn(User, 'create');

    const adminUser = await AdminUser.create(createUserDtoStub);

    expect(adminUser).toBeInstanceOf(AdminUser);
    expect(mockUserCreate).toHaveBeenCalledWith(createUserDtoStub);
  });
});
