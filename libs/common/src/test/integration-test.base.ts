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

  async afterAll() {
    await this.testHelperService.clearDatabase();
    await this.testHelperService.closeConnection();
    await this.app.close();
  }
}
