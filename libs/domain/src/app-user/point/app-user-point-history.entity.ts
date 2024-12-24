import { ApiProperty } from '@nestjs/swagger';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';
import { MyBaseEntity } from '@common/entity/my-base-entity';

@Entity('user_point_history', { schema: 'app' })
export class AppUserPointHistory extends MyBaseEntity {
  @Column('bigint', { name: 'user_point_id' })
  userPointId: bigint;

  @ApiProperty({
    example: 1000,
  })
  @Column('int', { name: 'point' })
  point: number;

  @ApiProperty({
    example: 2000,
    description: '해당 시점 잔여 포인트',
  })
  @Column('int', { name: 'remaining_point' })
  remainingPoint: number;

  @ApiProperty({
    enum: AppUserPointHistoryAction,
  })
  // TODO 1, 2, 3 mapping
  // @Column({ name: 'action', type: 'enum', enum: AppUserPointHistoryAction })
  action: AppUserPointHistoryAction;

  @ApiProperty({
    example: 1,
  })
  @Column('bigint', { name: 'action_id' })
  actionId: bigint;

  @ManyToOne(() => AppUserPoint, (point) => point.histories)
  @JoinColumn({ name: 'user_point_id', referencedColumnName: 'id' })
  userPoint: AppUserPoint;

  @OneToOne(() => AppUserPointStorage, (pointStorage) => pointStorage.history, {
    cascade: true,
  })
  storage?: AppUserPointStorage;

  @OneToMany(
    () => AppUserPointConsumption,
    (consumption) => consumption.history,
    {
      cascade: true,
    },
  )
  consumptions?: AppUserPointConsumption[];
}
