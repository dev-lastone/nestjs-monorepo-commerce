import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';

@Entity('user_point_storage', { schema: 'app' })
@Index(['history'])
export class AppUserPointStorage {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @Column('int', { name: 'point' })
  point: number;

  @Column('timestamp', { name: 'expiration_at' })
  expirationAt: Date;

  @OneToOne(() => AppUserPointHistory, (pointHistory) => pointHistory.storage, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'user_point_history_id', referencedColumnName: 'id' })
  history: AppUserPointHistory;

  @OneToOne(() => AppUserPointConsumption, (consumption) => consumption.storage)
  consumption: AppUserPointConsumption;
}
