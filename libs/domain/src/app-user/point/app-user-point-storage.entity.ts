import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { BigIntToNumberTransformer } from '@common/entity/transformer';

@Entity('user_point_storage', { schema: 'app' })
export class AppUserPointStorage {
  @Generated('increment')
  @PrimaryColumn({
    type: 'bigint',
    transformer: BigIntToNumberTransformer,
  })
  id: number;

  @Column('bigint', { name: 'user_point_history_id' })
  userPointHistoryId: number;

  @Column('int', { name: 'point' })
  point: number;

  @Column('timestamp', { name: 'expiration_at' })
  expirationAt: Date;

  @OneToOne(() => AppUserPointHistory, (pointHistory) => pointHistory.storage)
  @JoinColumn({ name: 'user_point_history_id', referencedColumnName: 'id' })
  history: AppUserPointHistory;
}
