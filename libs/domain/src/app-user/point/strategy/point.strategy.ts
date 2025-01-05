import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

export interface PointStrategy {
  get userId(): bigint;
  get action(): AppUserPointHistoryAction;
  get actionId(): bigint;
  get point(): number;
  get expirationAt(): Date;
}
