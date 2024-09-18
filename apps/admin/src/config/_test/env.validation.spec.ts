import 'reflect-metadata';
import { EnvVariables, validateEnv } from '../env.validation';

describe('env validation', () => {
  it('성공', () => {
    const JWT_SECRET = 'test';

    const config = {
      JWT_SECRET,
    };

    const envVariables = new EnvVariables();
    envVariables.JWT_SECRET = JWT_SECRET;

    expect(validateEnv(config)).toEqual(envVariables);
  });

  it('실패', () => {
    const config = {};
    const errorConstraints = [
      {
        isNotEmpty: 'JWT_SECRET should not be empty',
        isString: 'JWT_SECRET must be a string',
      },
    ];

    expect(() => validateEnv(config)).toThrow(
      new Error(JSON.stringify(errorConstraints)),
    );
  });
});
