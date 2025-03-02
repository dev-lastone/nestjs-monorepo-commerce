export function mockTransactional() {
  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => {},
  }));
}
