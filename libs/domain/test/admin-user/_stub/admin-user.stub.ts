import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { userStub } from '../../_vo/_stub/user.stub';

export const adminUserStub = {
  ...userStub,
} as AdminUser;
