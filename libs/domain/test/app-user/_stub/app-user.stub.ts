import { AppUser } from '@domain/app-user/app-user.entity';
import { userStub } from '../../_vo/_stub/user.stub';

const appUser = {
  ...userStub,
} as AppUser;
export const appUserStub = appUser;
