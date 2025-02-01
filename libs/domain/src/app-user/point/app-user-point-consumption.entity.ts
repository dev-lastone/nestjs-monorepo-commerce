import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';

@Entity('user_point_consumption', { schema: 'app' })
export class AppUserPointConsumption {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column('bigint', { name: 'user_point_history_id' })
  userPointHistoryId: number;

  @Column('bigint', { name: 'user_point_storage_id' })
  userPointStorageId: number;

  @Column('int', { name: 'point' })
  point: number;

  @ManyToOne(
    () => AppUserPointHistory,
    (pointHistory) => pointHistory.consumptions,
  )
  @JoinColumn({ name: 'user_point_history_id', referencedColumnName: 'id' })
  history: AppUserPointHistory;
}
