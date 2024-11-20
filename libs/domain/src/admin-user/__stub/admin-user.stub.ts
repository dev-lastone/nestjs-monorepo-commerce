import {
  invalidUserPasswordStub,
  userPasswordStub,
} from '@domain/_vo/__stub/user-password.stub';

export const adminUserStub = {
  id: 1,
  name: '홍길동',
  email: 'test@test.com',
  password: userPasswordStub,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const invalidAdminUserStub = {
  email: 'invalid@test.come',
  password: invalidUserPasswordStub,
};
