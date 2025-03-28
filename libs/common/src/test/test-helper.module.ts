import { Module } from '@nestjs/common';
import { TestHelperService } from './test-helper.service';
import { configModule } from '@common/setting/config';
import { typeOrmAdminTestSetting } from '@common/setting/type-orm.setting';

@Module({
  imports: [configModule(), typeOrmAdminTestSetting()],
  providers: [TestHelperService],
  exports: [TestHelperService],
})
export class TestHelperModule {}
