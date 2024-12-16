import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
