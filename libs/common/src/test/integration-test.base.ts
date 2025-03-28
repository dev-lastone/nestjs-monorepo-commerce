import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestHelperModule } from './test-helper.module';
import { TestHelperService } from '@common/test/test-helper.service';

export class IntegrationTestBase {
  public app: INestApplication;
  protected testHelperService: TestHelperService;

  async beforeAll(module: any) {
    const moduleRef = await Test.createTestingModule({
      imports: [TestHelperModule, module],
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
