import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { PickType } from '@nestjs/swagger';

export class AppUserPointDto extends PickType(AppUserPointHistory, [
  'point',
  'action',
  'actionId',
]) {}

export class SaveAppUserPointDto extends PickType(AppUserPointHistory, [
  'point',
  'action',
  'actionId',
]) {
  expirationAt: Date;
}
