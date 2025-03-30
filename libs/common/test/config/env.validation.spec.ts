import 'reflect-metadata';
import { EnvVariables, validateEnv } from '@common/config/env.validation';

describe('env validation', () => {
  it('성공', () => {
    const config = {
      JWT_SECRET: 'test',
      JWT_EXPIRES_IN: '60s',
      DB_HOST: 'localhost',
      DB_USERNAME: 'root',
      DB_PASSWORD: 'password',
      DB_PORT: 1234,
      DB_SLAVE_USERNAME: 'slave',
      DB_SLAVE_PASSWORD: 'slave-password',
      DB_SLAVE_PORT: 4321,
      DB_DATABASE: 'database',
    };

    const envVariables = Object.assign(new EnvVariables(), config);

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
      {
        isNotEmpty: 'DB_HOST should not be empty',
        isString: 'DB_HOST must be a string',
      },
      {
        isNotEmpty: 'DB_USERNAME should not be empty',
        isString: 'DB_USERNAME must be a string',
      },
      {
        isNotEmpty: 'DB_PASSWORD should not be empty',
        isString: 'DB_PASSWORD must be a string',
      },
      {
        isNotEmpty: 'DB_PORT should not be empty',
        isNumber:
          'DB_PORT must be a number conforming to the specified constraints',
      },
      {
        isNotEmpty: 'DB_SLAVE_USERNAME should not be empty',
        isString: 'DB_SLAVE_USERNAME must be a string',
      },
      {
        isNotEmpty: 'DB_SLAVE_PASSWORD should not be empty',
        isString: 'DB_SLAVE_PASSWORD must be a string',
      },
      {
        isNotEmpty: 'DB_SLAVE_PORT should not be empty',
        isNumber:
          'DB_SLAVE_PORT must be a number conforming to the specified constraints',
      },
      {
        isNotEmpty: 'DB_DATABASE should not be empty',
        isString: 'DB_DATABASE must be a string',
      },
    ];

    expect(() => validateEnv(config)).toThrow(
      new Error(JSON.stringify(errorConstraints)),
    );
  });
});
