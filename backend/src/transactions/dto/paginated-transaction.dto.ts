import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../entities/transaction.entity';

export class PaginatedTransactionDto {
  @ApiProperty({ type: 'number' })
  totalPages: number;

  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;

  @ApiProperty({ type: 'array' })
  data: Transaction[];
}
