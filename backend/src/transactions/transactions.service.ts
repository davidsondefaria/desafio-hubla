import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async transformBuffer(transactionsBuffer: Buffer) {
    // TODO define the return type
    // console.log(transactionsBuffer.toString());
    const transactions = await this.transactionsRepository.find();
    console.log(transactions);
  }
}
