import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_point_consumption', { schema: 'app' })
export class AppUserPointConsumption {
  @PrimaryGeneratedColumn()
  id: number;
  userPointHistoryId: number;
  userPointStorageId: number;
  point: number;
}
