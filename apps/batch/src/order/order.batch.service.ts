import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderBatchService {
  @Cron('0 0 0 * * *')
  confirmOrders() {
    // 배송일 부터 7일 지난 주문상품들 조회
    // 구매확정 로직(상태변경, 포인트 적립)
  }
}
