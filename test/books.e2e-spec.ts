import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import { EnvVariablesModule } from '../src/configuration/env-variables.module';
import { EnvVariablesTestingModule } from './config/env-varibles-testing-module';
import { CreateBookDto } from '../src/books/dtos/create-book.dto/create-book.dto';
import { Repository } from 'typeorm';
import { BookEntity } from '../src/books/book/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let postgreSqlContainer: StartedPostgreSqlContainer;

  beforeEach(async () => {
    postgreSqlContainer = await new PostgreSqlContainer('postgres:17')
      .withDatabase('book-monkey-e2e')
      .withUsername('admin')
      .withPassword('admin')
      .start();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideModule(EnvVariablesModule)
      .useModule(
        EnvVariablesTestingModule.with({
          database_server: postgreSqlContainer.getHost(),
          database_name: postgreSqlContainer.getDatabase(),
          database_port: postgreSqlContainer.getPort(),
          database_username: postgreSqlContainer.getUsername(),
          database_password: postgreSqlContainer.getPassword(),
          database_synchronize_entity_models_with_database: true
        })
      )
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 20_000);

  afterAll(async () => {
    await app.close();
    await postgreSqlContainer.stop();
  });

  it('/books (POST), persists the new book', async () => {
    const httpServer = app.getHttpServer();
    const dto: CreateBookDto = {
      isbn: '0-0-0-0-0-0',
      title: 'TestContainers',
      authors: ['Are', 'Incredible'],
      price: 10_000,
      amount: 100
    };
    const bookRepository = app.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));

    const response = await request(httpServer).post('/books').send(dto).expect(201);
    const bookId = `${response.body.id}`;

    const createdBook = await bookRepository.findOneBy({ id: bookId });

    expect(createdBook).toMatchObject(dto);
  });
});
