import { UserPassword } from '@domain/_vo/user-password';
import { userPassword } from '@common/constant/example';

describe('UserPassword', () => {
  const validValue = userPassword;

  describe('create', () => {
    const shortValue = '1234567';
    it('should fail validation when password is short', () => {
      expect(() => UserPassword.create(shortValue)).rejects.toHaveLength(1);
    });

    it('should fail validation when password is long', () => {
      const longValue = '123456789012345678901';
      expect(() => UserPassword.create(longValue)).rejects.toHaveLength(1);
    });

    it('should create a UserPassword when the input is valid', async () => {
      const userPassword = await UserPassword.create(validValue);
      expect(userPassword).toBeInstanceOf(UserPassword);
      expect(userPassword.getValue()).not.toBe(validValue);
      expect(userPassword.getValue()).toHaveLength(60);
    });
  });

  it('compare', async () => {
    const userPassword = await UserPassword.create(validValue);

    await expect(userPassword.compare(validValue)).resolves.not.toThrow();
    await expect(userPassword.compare('invalid')).rejects.toThrow();
  });
});
