import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../../domain/admin-user/admin-user.entity';

@Injectable()
export class AdminUserRepo {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepo: Repository<AdminUser>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.adminUserRepo.findOne({
      where: {
        email,
      },
    });
  }

  async save(adminUser: AdminUser) {
    return await this.adminUserRepo.save(adminUser);
  }
}
