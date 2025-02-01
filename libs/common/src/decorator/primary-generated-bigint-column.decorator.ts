import { applyDecorators } from '@nestjs/common';
import { Generated, PrimaryColumn, PrimaryColumnOptions } from 'typeorm';
import { BigIntToNumberTransformer } from '@common/entity/transformer';

export const PrimaryGeneratedBigintColumn = (
  options?: PrimaryColumnOptions,
): PropertyDecorator => {
  return applyDecorators(
    Generated('increment'),
    PrimaryColumn({
      ...options,
      type: 'bigint',
      transformer: BigIntToNumberTransformer,
    }),
  );
};
