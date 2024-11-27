import { UserPassword } from '@domain/_vo/user-password';

describe('UserPassword', () => {
  const value = 'string1234';

  it('create', async () => {
    const userPassword = await UserPassword.create(value);

    expect(userPassword).toBeInstanceOf(UserPassword);
    expect(userPassword.getValue()).not.toBe(value);
    expect(userPassword.getValue()).toHaveLength(60);
  });

  it('compare', async () => {
    const userPassword = await UserPassword.create(value);

    await expect(userPassword.compare('string1234')).resolves.not.toThrow();
    await expect(userPassword.compare('invalid')).rejects.toThrow();
  });
});
