import { Entity } from 'typeorm';
import { User } from '@domain/user/user';
import { CreateUserDto } from '@domain/user/dto/create-user.dto';

@Entity('user', { schema: 'admin' })
export class AdminUser extends User {
  static async create(dto: CreateUserDto) {
    const adminUser = new AdminUser();
    Object.assign(adminUser, await User.create(dto));
    return adminUser;
  }
}
