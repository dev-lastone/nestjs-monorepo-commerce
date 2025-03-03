import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';
import { BigIntToNumberTransformer } from '@common/entity/transformer';

@Entity('user_point_consumption', { schema: 'app' })
export class AppUserPointConsumption {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @Column('bigint', {
    name: 'user_point_history_id',
    transformer: BigIntToNumberTransformer,
  })
  userPointHistoryId: number;

  @Column('bigint', {
    name: 'user_point_storage_id',
    transformer: BigIntToNumberTransformer,
  })
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
