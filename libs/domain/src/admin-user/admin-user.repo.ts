import { Injectable } from '@nestjs/common';
import { AdminUser } from '@domain/domain/admin-user/admin-user';
import { adminUserStub } from '@domain/domain/admin-user/__stub/admin-user.stub';

@Injectable()
export class AdminUserRepo {
  #adminUsers: AdminUser[] = [adminUserStub];

  findOne(adminUser: Partial<AdminUser>) {
    return this.#adminUsers.find((user) => user.email === adminUser.email);
  }
}
