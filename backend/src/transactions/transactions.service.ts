import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async processTransactions(
    transactionsBuffer: Buffer,
  ): Promise<Transaction[]> {
    const transactionLines = this.transformBufferIntoString(transactionsBuffer);
    const transactionsToInsert = this.splitData(transactionLines);
    const transactions = await this.createMany(transactionsToInsert);
    return transactions;
  }

  transformBufferIntoString(buffer: Buffer): string[] {
    return buffer
      .toString()
      .split(`\n`)
      .filter((line) => line.length > 0);
  }

  splitData(transactionLines: string[]): CreateTransactionDto[] {
    const transactions = transactionLines.map((line) => ({
      type: Number(line.slice(0, 1)),
      date: new Date(line.slice(1, 26)),
      product: line.slice(26, 56).trim(),
      value: Number(line.slice(56, 66)),
      vendor: line.slice(66),
    }));
    return transactions;
  }

  async createMany(transactions: CreateTransactionDto[]): Promise<any> {
    const res = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Transaction)
      .values(transactions)
      .orUpdate(['product', 'vendor', 'date'], ['id'], {
        skipUpdateIfNoValuesChanged: true,
      })
      .execute();
    const ids: string[] = res.raw.map(({ id }) => id);
    return await this.findTransactions({ id: In(ids) });
  }

  async findTransactions(where?: {
    [key: string]: any;
  }): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find({ where });
    return transactions;
  }
}
