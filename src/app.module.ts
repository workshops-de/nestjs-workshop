import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { RequestIdTracingModule } from './request-id-tracing/request-id-tracing.module';
import { RequestIdTracingMiddleware } from './request-id-tracing/request-id-tracing-middleware.service';
import { EnvVariablesModule } from './configuration/env-variables.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvVariablesService } from './configuration/env-variables.service';
import { HealthzModule } from './healthz/healthz.module';
import { BookEntity } from './books/book/book.entity';
import { BookRatingsModule } from './book-ratings/book-ratings.module';
import { BookRatingEntity } from './book-ratings/book-rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envVariables: EnvVariablesService) => ({
        type: 'postgres',
        host: envVariables.get('database_server'),
        port: envVariables.get('database_port'),
        username: envVariables.get('database_username'),
        password: envVariables.get('database_password'),
        database: envVariables.get('database_name'),
        entities: [BookEntity, BookRatingEntity],
        synchronize: false
      }),
      inject: [EnvVariablesService]
    }),
    BooksModule,
    RequestIdTracingModule,
    EnvVariablesModule,
    HealthzModule,
    BookRatingsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdTracingMiddleware).forRoutes('*splat');
  }
}
