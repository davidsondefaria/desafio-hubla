import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  transformBuffer(transactionsBuffer: Buffer) {
    // TODO define the return type

    console.log(transactionsBuffer.toString());
  }
}
