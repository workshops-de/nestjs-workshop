import { Injectable } from '@nestjs/common';
import { RequestIdTracingAsyncLocalStorage } from './request-id-tracing/request-id-tracing-async-local-storage.service';

@Injectable()
export class AppService {
  constructor(private asyncLocalStorage: RequestIdTracingAsyncLocalStorage) {}

  getHello(): string {
    const traceId = this.asyncLocalStorage.getStore()?.traceId;
    return `Hello World! ${traceId}`;
  }
}
