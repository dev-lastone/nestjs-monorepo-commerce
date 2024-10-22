import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_point_storage', { schema: 'app' })
export class AppUserPointStorage {
  @PrimaryGeneratedColumn()
  id: number;
  userPointHistoryId: number;
  point: number;
  // expirationAt: Date;
}
