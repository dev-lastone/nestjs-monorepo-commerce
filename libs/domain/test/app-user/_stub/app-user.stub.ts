import { userStub } from '../../_vo/_stub/user.stub';
import { AppUser } from '@domain/app-user/app-user.entity';

export const appUserStub = {
  ...userStub,
} as AppUser;
