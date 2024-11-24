import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { User } from '@domain/_vo/user';

// TODO admin jwt 별도 발급시 admin domain 으로 이동 예정
@Entity('user', { schema: 'admin' })
export class AdminUser extends MyBaseEntity {
  @Column(() => User, { prefix: false })
  user: User;

  static async create(dto: { name: string; email: string; password: string }) {
    const adminUser = new AdminUser();
    adminUser.user = await User.create(dto);
    return adminUser;
  }
}
