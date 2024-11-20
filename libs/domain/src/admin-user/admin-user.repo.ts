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

  async findOne(partial: Partial<AdminUser>) {
    return await this.adminUserRepo.findOne({
      where: {
        ...partial,
      },
    });
  }

  async save(adminUser: AdminUser) {
    return await this.adminUserRepo.save(adminUser);
  }
}
