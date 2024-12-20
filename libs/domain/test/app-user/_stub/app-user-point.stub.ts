import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';

export const appUserPointSaveDtoStub = {
  point: 1000,
  action: AppUserPointHistoryAction.ORDER_PRODUCT,
  actionId: 1,
} as AppUserPointDto;
