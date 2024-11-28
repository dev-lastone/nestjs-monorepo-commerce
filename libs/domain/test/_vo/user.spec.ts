import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';
import { User } from '@domain/_vo/user';
import { UserPassword } from '@domain/_vo/user-password';

describe('User', () => {
  it('create', async () => {
    const dto = new CreateUserDto();
    dto.name = '홍길동';
    dto.email = 'test@test.com';
    dto.password = 'string1234';

    const mockUserPasswordCreate = jest.spyOn(UserPassword, 'create');

    const user = await User.create(dto);

    expect(user.name).toBe(dto.name);
    expect(user.email).toBe(dto.email);
    expect(mockUserPasswordCreate).toHaveBeenCalledWith(dto.password);
  });
});
