import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';

@Entity('user_point_consumption', { schema: 'app' })
export class AppUserPointConsumption {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @Column('int', { name: 'point' })
  point: number;

  @ManyToOne(
    () => AppUserPointHistory,
    (pointHistory) => pointHistory.consumptions,
  )
  @JoinColumn({ name: 'user_point_history_id', referencedColumnName: 'id' })
  history: AppUserPointHistory;

  @OneToOne(() => AppUserPointStorage, (storage) => storage.consumption)
  @JoinColumn({ name: 'user_point_storage_id', referencedColumnName: 'id' })
  storage: AppUserPointStorage;
}
