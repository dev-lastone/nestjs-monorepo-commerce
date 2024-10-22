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

  findOneByEmail(email: string) {
    return this.adminUserRepo.findOne({
      where: {
        email,
      },
    });
  }
}
