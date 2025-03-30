import { Module } from '@nestjs/common';
import { TestHelperModule } from '@common/test/test-helper.module';
import { typeOrmAdminTestSetting } from '@common/setting/type-orm.setting';
import { TestHelperService } from '@common/test/test-helper.service';

@Module({
  imports: [TestHelperModule.forRoot(typeOrmAdminTestSetting)],
  providers: [TestHelperService],
  exports: [TestHelperService],
})
export class TestHelperAdminModule {}
