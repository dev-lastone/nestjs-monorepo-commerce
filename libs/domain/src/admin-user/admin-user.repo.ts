import { Injectable } from '@nestjs/common';
import { AdminUser } from '@domain/admin-user/admin-user';
import { adminUserStub } from '@domain/admin-user/__stub/admin-user.stub';

@Injectable()
export class AdminUserRepo {
  #adminUsers: AdminUser[] = [adminUserStub];

  findOneByEmail(email: string) {
    return this.#adminUsers.find((user) => user.email === email);
  }
}
