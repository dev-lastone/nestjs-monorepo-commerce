import { ApiProperty } from '@nestjs/swagger';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';

@Entity('user_point_history', { schema: 'app' })
export class AppUserPointHistory {
  @PrimaryGeneratedColumn()
  id: number;
  userId: number;
  @ApiProperty({
    example: 1000,
  })
  point: number;
  @ApiProperty({
    example: 2000,
    description: '해당 시점 잔여 포인트',
  })
  remainingPoint: number;
  @ApiProperty({
    enum: AppUserPointHistoryAction,
  })
  action: AppUserPointHistoryAction;
  @ApiProperty({
    example: 1,
  })
  actionId: number;
  // createdAt: Date;
  storage?: AppUserPointStorage;
  consumptions?: AppUserPointConsumption[];
}
