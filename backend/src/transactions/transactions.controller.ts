import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
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
    // type: , //TODO define this type
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
}
