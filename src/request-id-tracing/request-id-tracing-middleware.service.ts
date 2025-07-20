import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { RequestIdTracingAsyncLocalStorage } from './request-id-tracing-async-local-storage.service';

@Injectable()
export class RequestIdTracingMiddleware implements NestMiddleware {
  constructor(private asyncLocalStorage: RequestIdTracingAsyncLocalStorage) {}

  use(req: Request, res: Response, next: NextFunction) {
    const incoming = req.headers['X-CORRELATION-ID'];
    const traceId = typeof incoming === 'string' && incoming ? incoming : randomUUID();

    // Antwort-Header setzen
    res.setHeader('X-CORRELATION-ID', traceId);

    // Async-Context mit traceId ausstatten
    this.asyncLocalStorage.run({ traceId }, () => next());
  }
}
