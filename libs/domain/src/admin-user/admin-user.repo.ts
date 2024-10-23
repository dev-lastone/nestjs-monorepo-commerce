import { Injectable } from '@nestjs/common';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserRepo {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepo: Repository<AdminUser>,
  ) {}

  findOne(partial: Partial<AdminUser>) {
    return this.adminUserRepo.findOne({
      where: {
        ...partial,
      },
    });
  }
}
