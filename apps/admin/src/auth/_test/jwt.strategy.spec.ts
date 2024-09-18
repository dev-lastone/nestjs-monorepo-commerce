import { JwtStrategy } from '../jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('JwtAuthGuard', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              switch (key) {
                case 'JWT_SECRET':
                  return 'secret'; // 테스트 환경에서 사용할 값
              }
            }),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

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
