import { Injectable } from '@nestjs/common';
import { AppUser } from '@domain/app-user/app-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppUserRepo {
  constructor(
    @InjectRepository(AppUser)
    private readonly appUserRepo: Repository<AppUser>,
  ) {}

  async save(appUser: AppUser) {
    return await this.appUserRepo.save(appUser);
  }

  async findOneByEmail(email: string) {
    return await this.appUserRepo.findOne({
      where: {
        email,
      },
    });
  }
}
