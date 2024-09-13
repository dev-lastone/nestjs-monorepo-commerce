import { AuthAdminGuard } from '../auth.admin.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthAdminGuard', () => {
  const jwtService = new JwtService();
  const authAdminGuard = new AuthAdminGuard(jwtService);

  it('성공', () => {
    const mockExecutionContext = createMockExecutionContext('valid-token');
    jest
      .spyOn(jwtService, 'verify')
      .mockReturnValue({ sub: 1, email: 'test@test.com', name: '홍길동' });

    const result = authAdminGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('잘못된 토큰', () => {
    const mockExecutionContext = createMockExecutionContext('invalid-token');
    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => authAdminGuard.canActivate(mockExecutionContext)).toThrow(
      new UnauthorizedException(),
    );
  });

  it('토큰이 없을때', () => {
    const mockExecutionContext = createMockExecutionContext(null);

    expect(() => authAdminGuard.canActivate(mockExecutionContext)).toThrow(
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
    } as any;
  }
});
