import 'reflect-metadata';
import { EnvVariables, validateEnv } from '@common/config/env.validation';

describe('env validation', () => {
  it('성공', () => {
    const JWT_SECRET = 'test';
    const JWT_EXPIRES_IN = '60s';
    const DB_HOST = 'localhost';
    const DB_USERNAME = 'root';
    const DB_PASSWORD = 'password';
    const DB_DATABASE = 'test';

    const config = {
      JWT_SECRET,
      JWT_EXPIRES_IN,
      DB_HOST,
      DB_USERNAME,
      DB_PASSWORD,
      DB_DATABASE,
    };

    const envVariables = new EnvVariables();
    envVariables.JWT_SECRET = JWT_SECRET;
    envVariables.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
    envVariables.DB_HOST = DB_HOST;
    envVariables.DB_USERNAME = DB_USERNAME;
    envVariables.DB_PASSWORD = DB_PASSWORD;
    envVariables.DB_DATABASE = DB_DATABASE;

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
        isNotEmpty: 'DB_DATABASE should not be empty',
        isString: 'DB_DATABASE must be a string',
      },
    ];

    expect(() => validateEnv(config)).toThrow(
      new Error(JSON.stringify(errorConstraints)),
    );
  });
});
