import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  getHello(): string {
    return 'Hello Batch!';
  }

  @Cron('*/30 * * * * *')
  test() {
    console.log('test');
  }
}
