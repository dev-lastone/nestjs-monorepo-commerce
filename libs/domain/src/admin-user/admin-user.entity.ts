import { Entity } from 'typeorm';
import { User } from '@domain/_vo/user';
import { CreateUserDto } from '@domain/_vo/dto/create-user.dto';

// TODO admin jwt 별도 발급시 admin domain 으로 이동 예정
@Entity('user', { schema: 'admin' })
export class AdminUser extends User {
  static async create(dto: CreateUserDto) {
    const adminUser = new AdminUser();
    Object.assign(adminUser, await User.create(dto));
    return adminUser;
  }
}
