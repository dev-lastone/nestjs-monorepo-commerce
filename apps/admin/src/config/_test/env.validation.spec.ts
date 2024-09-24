import 'reflect-metadata';
import { EnvVariables, validateEnv } from '../env.validation';

describe('env validation', () => {
  it('성공', () => {
    const JWT_SECRET = 'test';
    const JWT_EXPIRES_IN = '60s';

    const config = {
      JWT_SECRET,
      JWT_EXPIRES_IN,
    };

    const envVariables = new EnvVariables();
    envVariables.JWT_SECRET = JWT_SECRET;
    envVariables.JWT_EXPIRES_IN = JWT_EXPIRES_IN;

    expect(validateEnv(config)).toEqual(envVariables);
  });

  it('실패', () => {
    const config = {};
    const errorConstraints = [
      {
        isNotEmpty: 'JWT_SECRET should not be empty',
        isString: 'JWT_SECRET must be a string',
      },
      {
        isNotEmpty: 'JWT_EXPIRES_IN should not be empty',
        isString: 'JWT_EXPIRES_IN must be a string',
      },
    ];

    expect(() => validateEnv(config)).toThrow(
      new Error(JSON.stringify(errorConstraints)),
    );
  });
});
