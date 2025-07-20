import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { RequestIdTracingModule } from './request-id-tracing/request-id-tracing.module';
import { RequestIdTracingMiddleware } from './request-id-tracing/request-id-tracing-middleware.service';

@Module({
  imports: [BooksModule, RequestIdTracingModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdTracingMiddleware).forRoutes('*');
  }
}
