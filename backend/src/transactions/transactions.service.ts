import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginateQuery, getDefaultPagination } from '../@helpers/pagination';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
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
    const res = await this.transactionsRepository
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

  async findTransactions(
    where?: {
      [key: string]: any;
    },
    options?: any,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find({
      where,
      ...options,
    });
    return transactions;
  }

  async getTransactions(_query: PaginateQuery): Promise<Transaction[]> {
    const query = getDefaultPagination(_query);
    const { page, limit, sortBy } = query;
    const skip = page === 1 ? 0 : (page - 1) * limit;
    return this.findTransactions(
      {},
      {
        ...(sortBy && { order: { [sortBy.field]: sortBy.by } }),
        take: limit,
        skip,
      },
    );
  }
}
