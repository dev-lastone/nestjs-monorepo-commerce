import { UserPassword } from '@domain/_vo/user-password';
import { User } from '@domain/user/user';
import { createUserDtoStub } from './stub/dto/create-user.dto.stub';

describe('User', () => {
  it('create', async () => {
    const mockUserPasswordCreate = jest.spyOn(UserPassword, 'create');

    const user = await User.create(createUserDtoStub);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(createUserDtoStub.name);
    expect(user.email).toBe(createUserDtoStub.email);
    expect(mockUserPasswordCreate).toHaveBeenCalledWith(
      createUserDtoStub.password,
    );
  });
});
