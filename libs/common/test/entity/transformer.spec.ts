import { BigIntToNumberTransformer } from '@common/entity/transformer';

it('BigIntToNumberTransformer', () => {
  const value = BigIntToNumberTransformer.to(5);
  expect(value).toBe(5);
  const value2 = BigIntToNumberTransformer.from('5');
  expect(value2).toBe(5);
});
