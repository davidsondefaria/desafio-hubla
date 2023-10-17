import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { TransactionsService } from './transactions.service';
import { FileUploadDto } from './dto/file-transaction-upload.dto';
import { Transaction } from './entities/transaction.entity';
import { PaginateQueryOptions } from '../@decorators/paginateQuery.decorator';
import { PaginateQuery } from 'src/@helpers/pagination';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of transactions',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    description: 'The file was submitted successfully',
    type: Transaction,
  })
  @ApiResponse({
    status: 400,
    description: 'A file must be provided',
  })
  readTransactionsFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Transaction[]> {
    if (file && file.buffer) {
      return this.transactionsService.processTransactions(file.buffer);
    }
    throw new BadRequestException('A file must be provided!');
  }

  @Get()
  @ApiOkResponse({
    description: 'A list of transactions has been successfully fetched',
    type: Transaction,
  })
  @PaginateQueryOptions()
  getTransactions(@Query() query: PaginateQuery): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(query);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'A transaction has been successfully fetched',
    type: Transaction,
  })
  getTransaction(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransaction(id);
  }
}
