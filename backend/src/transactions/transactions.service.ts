import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginateQuery, getDefaultPagination } from '../@helpers/pagination';
import { PaginatedTransactionDto } from './dto/paginated-transaction.dto';

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

  async createMany(
    transactions: CreateTransactionDto[],
  ): Promise<Transaction[]> {
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
    const [data] = await this.findTransactions({ id: In(ids) });
    return data;
  }

  async findTransactions(
    where?: {
      [key: string]: any;
    },
    options?: any,
  ): Promise<[Transaction[], number]> {
    const transactions = await this.transactionsRepository.findAndCount({
      where,
      ...options,
    });
    return transactions;
  }

  async getTransactions(
    _query: PaginateQuery,
  ): Promise<PaginatedTransactionDto> {
    const query = getDefaultPagination(_query);
    const { page, limit, sortBy } = query;
    const skip = page === 1 ? 0 : (page - 1) * limit;
    const [transactions, total]: [Transaction[], number] =
      await this.findTransactions(
        {},
        {
          ...(sortBy && { order: { [sortBy.field]: sortBy.by } }),
          take: limit,
          skip,
        },
      );
    return {
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      data: transactions,
    };
  }

  async getTransaction(id: string): Promise<Transaction> {
    try {
      return await this.transactionsRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`Transaction could not be found: ${id}`);
    }
  }
}
