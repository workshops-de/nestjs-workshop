import { Module } from '@nestjs/common';
import { RequestIdTracingAsyncLocalStorage } from './request-id-tracing-async-local-storage.service';
import { RequestIdTracingMiddleware } from './request-id-tracing-middleware.service';

@Module({
  providers: [RequestIdTracingAsyncLocalStorage, RequestIdTracingMiddleware],
  exports: [RequestIdTracingMiddleware, RequestIdTracingAsyncLocalStorage]
})
export class RequestIdTracingModule {}
