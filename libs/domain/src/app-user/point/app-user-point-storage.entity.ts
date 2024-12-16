import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';

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

  @Column('timestamp', { name: 'expiration_at' })
  expirationAt: Date;

  @OneToOne(() => AppUserPointHistory, (pointHistory) => pointHistory.storage)
  @JoinColumn({ name: 'userPointHistoryId', referencedColumnName: 'id' })
  history: AppUserPointHistory;
}
