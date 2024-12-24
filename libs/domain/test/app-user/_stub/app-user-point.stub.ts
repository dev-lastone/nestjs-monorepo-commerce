import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { SaveAppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';

const expirationAt = new Date();
expirationAt.setDate(expirationAt.getDate() + 7);

export const saveAppUserPointDtoStub = {
  point: 1000,
  action: AppUserPointHistoryAction.ORDER_PRODUCT,
  actionId: 1n,
  expirationAt,
} as SaveAppUserPointDto;
