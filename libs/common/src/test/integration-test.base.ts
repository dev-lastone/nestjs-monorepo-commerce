import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestHelperService } from '@common/test/test-helper.service';

// TODO describe 까지 커버할 정도?
export class IntegrationTestBase {
  public app: INestApplication;
  protected testHelperService: TestHelperService;

  async beforeAll(module: any, testHelperModule: any) {
    const moduleRef = await Test.createTestingModule({
      imports: [testHelperModule, module],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.testHelperService =
      moduleRef.get<TestHelperService>(TestHelperService);

    await this.app.init();
  }

  // e2e 용도
  async afterAll() {
    await this.testHelperService.clearDatabase();
    await this.testHelperService.closeConnection();
    await this.app.close();
  }

  // integration 용도
  async afterEach(entity: any) {
    await this.testHelperService.clearEntity(entity);
  }

  async close() {
    await this.testHelperService.closeConnection();
    await this.app.close();
  }

  // TODO before 특정 기능을 위한 세팅 로직
}
