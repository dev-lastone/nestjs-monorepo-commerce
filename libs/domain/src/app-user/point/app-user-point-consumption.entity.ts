import { Entity } from 'typeorm';

@Entity('user_point_consumption', { schema: 'app' })
export class AppUserPointConsumption {
  userPointHistoryId: number;
  userPointStorageId: number;
  point: number;
}
