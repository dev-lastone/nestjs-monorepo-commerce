import { JwtStrategy } from '../jwt.strategy';

describe('JwtAuthGuard', () => {
  const jwtStrategy = new JwtStrategy();

  it('validate', () => {
    const jwtPayload = {
      sub: 1,
      email: 'test@test.com',
      name: '홍길동',
      iat: 1234567890,
      exp: 1234567890,
    };

    expect(jwtStrategy.validate(jwtPayload)).toEqual(jwtPayload);
  });
});
