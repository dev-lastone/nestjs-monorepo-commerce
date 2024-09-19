import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt.auth.guard';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

describe('AuthAdminGuard', () => {
  const jwtAuthGuard = new JwtAuthGuard(new Reflector());

  it('성공', async () => {
    const mockExecutionContext = createMockExecutionContext('valid-token');

    jest
      .spyOn(jwt, 'verify')
      .mockResolvedValue({ sub: 1, email: 'test@test.com', name: '홍길동' });

    const result = jwtAuthGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('잘못된 토큰', async () => {
    const mockExecutionContext = createMockExecutionContext('invalid-token');

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => jwtAuthGuard.canActivate(mockExecutionContext)).toThrow(
      new UnauthorizedException(),
    );
  });

  it('토큰이 없을때', async () => {
    const mockExecutionContext = createMockExecutionContext(null);

    expect(() => jwtAuthGuard.canActivate(mockExecutionContext)).toThrow(
      new UnauthorizedException(),
    );
  });

  function createMockExecutionContext(token: string | null): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: token ? `Bearer ${token}` : null,
          },
        }),
      }),
      getHandler: () => ({}),
    } as any;
  }
});
