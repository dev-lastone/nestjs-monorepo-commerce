import { UserId } from '@common/decorator/user-id.decorator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { ExecutionContext } from '@nestjs/common';

describe('UserId Decorator', () => {
  it('@Req() userId 만 뽑아내기', () => {
    function getParamDecoratorFactory(decorator) {
      class Test {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        public test(@decorator() value) {}
      }

      const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
      return args[Object.keys(args)[0]].factory;
    }

    const userId = 1;
    const mockRequest = {
      user: {
        sub: userId,
      },
    };

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    };

    const factory = getParamDecoratorFactory(UserId);
    const result = factory(null, mockExecutionContext as ExecutionContext);

    expect(result).toBe(userId);
  });
});
