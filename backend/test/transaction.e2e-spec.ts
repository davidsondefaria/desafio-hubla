import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Transaction (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/transaction (POST)', () => {
    it('should accept a file and process', () => {
      const filePath = `${__dirname}/utils/sales.txt`;
      return request(app.getHttpServer())
        .post('/transactions')
        .attach('file', filePath)
        .expect(201)
        .then(async (data) => {
          console.log(data.body);
        });
    });

    it('should throw 400 error if file is not attached', () => {
      return request(app.getHttpServer()).post('/transactions').expect(400);
    });
  });
});
