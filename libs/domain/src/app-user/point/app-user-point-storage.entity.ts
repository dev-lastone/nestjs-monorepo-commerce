import { Entity } from 'typeorm';

@Entity('user_point_storage', { schema: 'app' })
export class AppUserPointStorage {
  id: number;
  userPointHistoryId: number;
  point: number;
  // expirationAt: Date;
}
