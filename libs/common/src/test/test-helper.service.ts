import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TestHelperService {
  constructor(private readonly dataSource: DataSource) {}

  async clearDatabase() {
    const entities = this.dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.clear();
    }
  }

  async closeConnection() {
    await this.dataSource.destroy();
  }
}
