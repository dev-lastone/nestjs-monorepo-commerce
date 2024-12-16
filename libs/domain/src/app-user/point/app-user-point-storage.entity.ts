import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_point_storage', { schema: 'app' })
export class AppUserPointStorage {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column('bigint', { name: 'user_point_history_id' })
  userPointHistoryId: number;

  @Column('int', { name: 'point' })
  point: number;

  // expirationAt: Date;
}
