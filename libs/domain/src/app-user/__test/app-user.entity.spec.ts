import { AppUser } from '@domain/app-user/app-user.entity';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

describe('AppUser', () => {
  it('setPassword', () => {
    expect(
      AppUser.create({
        name: appUserStub.name,
        email: appUserStub.email,
        password: '1234',
      }),
    ).rejects.toThrowError('Password must be at least 8 characters long');
  });

  it('compare', async () => {
    const appUser = await AppUser.create({
      name: appUserStub.name,
      email: appUserStub.email,
      password: appUserStub.password,
    });

    expect(appUser.compare('1234')).rejects.toThrowError(
      ERROR_MESSAGES.InvalidSignIn,
    );
  });
});
