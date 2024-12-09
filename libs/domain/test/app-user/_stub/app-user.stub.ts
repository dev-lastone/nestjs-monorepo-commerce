import { AppUser } from '@domain/app-user/app-user.entity';
import { userStub } from '../../user/stub/user.stub';

export const appUserStub = {
  ...userStub,
} as AppUser;
