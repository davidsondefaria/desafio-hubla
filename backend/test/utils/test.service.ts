import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  public async cleanDatabase(): Promise<void> {
    try {
      const entities = this.dataSource.entityMetadatas;
      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(', ');
      // console.log('tests entities', tableNames);

      await this.dataSource.query(`DELETE FROM ${tableNames};`);
      // console.log('[TEST DATABASE]: Clean');
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }

  async getDataFrom(table: string): Promise<any> {
    return this.dataSource.query(`SELECT * FROM ${table}`);
  }
}
