import { Injectable } from '@nestjs/common';
import { AppUser } from '@domain/domain/app-user/app-user';
import { appUserStub } from '@domain/domain/user/__stub/app-user.stub';

@Injectable()
export class AppUserRepo {
  #appUsers: AppUser[] = [appUserStub];

  save(appUser: AppUser) {
    appUser.id = this.#appUsers[this.#appUsers.length - 1].id + 1;
    this.#appUsers.push(appUser);
    return appUser;
  }

  findOne(appUser: Partial<AppUser>) {
    return this.#appUsers.find((user) => user.email === appUser.email);
  }
}
