import { AppUser } from '@domain/app-user/app-user.entity';
import {
  appUserStub,
  invalidAppUserStub,
} from '@domain/app-user/__stub/app-user.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

describe('AppUser', () => {
  it('compare', async () => {
    const appUser = await AppUser.create({
      name: appUserStub.name,
      email: appUserStub.email,
      password: appUserStub.password,
    });

    expect(appUser.compare(invalidAppUserStub.password)).rejects.toThrowError(
      ERROR_MESSAGES.InvalidSignIn,
    );
  });
});
