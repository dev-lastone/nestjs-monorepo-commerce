import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedBigintColumn } from '@common/decorator/primary-generated-bigint-column.decorator';

export class MyBaseEntity {
  @PrimaryGeneratedBigintColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date | null;
}
