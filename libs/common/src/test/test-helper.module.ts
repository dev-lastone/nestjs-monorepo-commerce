import { DynamicModule, Module } from '@nestjs/common';
import { TestHelperService } from './test-helper.service';
import { configModule } from '@common/setting/config';

@Module({})
export class TestHelperModule {
  static forRoot(typeOrmSetting: () => DynamicModule): DynamicModule {
    return {
      module: TestHelperModule,
      imports: [configModule(), typeOrmSetting()],
      providers: [TestHelperService],
      exports: [TestHelperService],
    };
  }
}
