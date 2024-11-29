import { User } from '@domain/_vo/user';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { AdminUser } from '@domain/admin-user/admin-user.entity';

describe('AdminUser', () => {
  it('create', async () => {
    const dto: CreateUserDto = {
      name: '홍길동',
      email: 'test@test.com',
      password: 'string1234',
    };

    const mockUserCreate = jest.spyOn(User, 'create');

    const adminUser = await AdminUser.create(dto);

    expect(adminUser).toBeInstanceOf(AdminUser);
    expect(mockUserCreate).toHaveBeenCalledWith(dto);
  });
});
