import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import supertest from 'supertest';

describe('AppController (e2e)', () => {
   let app: INestApplication;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         controllers: [AppController],
         providers: [AppService],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
   });

   it('/ (GET)', () => {
      return supertest(app.getHttpServer())
         .get('/')
         .expect(200)
         .expect('Hello World!');
   });

   afterAll(async () => {
      await app.close();
   });
});
