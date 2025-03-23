module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: ['**/*.integration.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    'main.ts',
    'common/src/setting/*',
    '/node_modules/',
    '.e2e-spec.ts$',
    '.module.ts$',
  ],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage/integration',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@domain(|/.*)$': '<rootDir>/libs/domain/src/$1',
    '^@common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@application(|/.*)$': '<rootDir>/libs/application/src/$1',
  },
};
