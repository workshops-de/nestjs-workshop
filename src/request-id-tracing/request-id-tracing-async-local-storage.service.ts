import { AsyncLocalStorage } from 'async_hooks';
import { Injectable } from '@nestjs/common';

type Store = { traceId: string };

@Injectable()
export class RequestIdTracingAsyncLocalStorage extends AsyncLocalStorage<Store> {}
