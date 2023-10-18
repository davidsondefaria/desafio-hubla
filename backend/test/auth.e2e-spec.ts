import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { TestService } from './utils/test.service';
import { AuthService } from './../src/auth/auth.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  let authService: AuthService;
  let testService: TestService;

  const email = 'test-e2e@email.com';
  const password = 'password123';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    testService = moduleFixture.get<TestService>(TestService);
  });

  afterAll(async () => {
    await testService.cleanDatabase();
    await app.close();
  });

  it('should sign in a user (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201)
      .then(async ({ body }) => {
        expect(body.success).toBe(true);
        expect(body.message).toBe('You have been successfully registered!');

        const user = await testService.runQuery(`
          SELECT * FROM Users
          WHERE email = '${email}'
        `);

        expect(user[0].email).toBe(email);
      });
  });

  it('should throw 409 when email already exists (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(409);
  });

  it('should log in a user', async () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(200)
      .then(({ body }) => {
        expect(body.success).toBe(true);
        expect(body.message).toBe('You have been successfully logged!');

        expect(body.data.accessToken).not.toBeNull();
      });
  });

  it('should throw 401 in wrong email or password', async () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password: 'another-password' })
      .expect(401);
  });

  it('should log out a user', async () => {
    // TODO
  });
});
