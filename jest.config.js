module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // TODO unit, integration, e2e 테스트 환경별로 설정을 나눠야함
  coveragePathIgnorePatterns: [
    'main.ts',
    'common/src/setting/*',
    '.repo.ts$',
    '/node_modules/',
    '.e2e-spec.ts$',
    '.module.ts$',
  ],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@domain(|/.*)$': '<rootDir>/libs/domain/src/$1',
    '^@common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@application(|/.*)$': '<rootDir>/libs/application/src/$1',
  },
};
