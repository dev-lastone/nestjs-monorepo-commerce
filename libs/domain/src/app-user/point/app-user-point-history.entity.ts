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
import { BigIntToNumberTransformer } from '@common/entity/transformer';

@Entity('user_point_history', { schema: 'app' })
export class AppUserPointHistory extends MyBaseEntity {
  // TODO userPointId 살리는거 고민. this 로 인해 반환값 커짐
  // typeorm 1:N save update 시 n 쪽 null 처리되는 이슈 검색
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
  @Column({ name: 'action', type: 'varchar', length: 20 })
  action: AppUserPointHistoryAction;

  @ApiProperty({
    example: 1,
  })
  @Column('bigint', {
    name: 'action_id',
    nullable: true,
    transformer: BigIntToNumberTransformer,
  })
  actionId?: number | null;

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
