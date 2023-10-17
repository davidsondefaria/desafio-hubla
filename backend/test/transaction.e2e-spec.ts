import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { TransactionsService } from './../src/transactions/transactions.service';
import { TestService } from './utils/test.service';
import { TestModule } from './utils/test.module';

describe('Transaction (e2e)', () => {
  let app: INestApplication;

  let transactionsService: TransactionsService;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    transactionsService =
      moduleFixture.get<TransactionsService>(TransactionsService);
    testService = moduleFixture.get<TestService>(TestService);
  });

  afterAll(async () => {
    await testService.cleanDatabase();
    await app.close();
  });

  describe('/transaction (POST)', () => {
    it('should accept a file and process', () => {
      const filePath = `${__dirname}/utils/test.sales.txt`;
      return request(app.getHttpServer())
        .post('/transactions')
        .attach('file', filePath)
        .expect(201)
        .then(async ({ body }) => {
          console.log(body);
          expect(body.length).toBe(1);
          // const transactions = await transactionsService.findTransactions();
          // expect(transactions[0].product).toBe('CURSO DE BEM-ESTAR');
        });
    });

    it('should throw 400 error if file is not attached', () => {
      return request(app.getHttpServer()).post('/transactions').expect(400);
    });
  });
});
