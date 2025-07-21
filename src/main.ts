import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './books/domain-exception.filter';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import compression from '@fastify/compress';
import { constants } from 'zlib';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(compression, {
    encodings: ['zstd', 'br', 'gzip'],
    threshold: 0.01,
    brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } }
  });

  app.useGlobalFilters(new DomainExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
