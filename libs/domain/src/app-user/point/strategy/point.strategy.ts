import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

export interface PointStrategy {
  get userId(): number;
  get action(): AppUserPointHistoryAction;
  get actionId(): number;
  get point(): number;
  get expirationAt(): Date;
}
