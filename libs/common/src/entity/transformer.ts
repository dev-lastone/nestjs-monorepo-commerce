import { ValueTransformer } from 'typeorm';

export const BigIntToNumberTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | number) => Number(value),
};
