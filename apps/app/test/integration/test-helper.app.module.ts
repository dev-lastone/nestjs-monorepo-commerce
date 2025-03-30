import { Module } from '@nestjs/common';
import { TestHelperModule } from '@common/test/test-helper.module';
import { typeOrmAppTestSetting } from '@common/setting/type-orm.setting';
import { TestHelperService } from '@common/test/test-helper.service';

@Module({
  imports: [TestHelperModule.forRoot(typeOrmAppTestSetting)],
  providers: [TestHelperService],
  exports: [TestHelperService],
})
export class TestHelperAppModule {}
