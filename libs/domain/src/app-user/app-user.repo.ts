import { Injectable } from '@nestjs/common';
import { AppUser } from '@domain/app-user/app-user.entity';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';

@Injectable()
export class AppUserRepo {
  #appUsers: AppUser[] = [appUserStub];

  save(appUser: AppUser) {
    appUser.id = this.#appUsers[this.#appUsers.length - 1].id + 1;
    this.#appUsers.push(appUser);
    return appUser;
  }

  findOneByEmail(email: string) {
    return this.#appUsers.find((user) => user.email === email);
  }
}
