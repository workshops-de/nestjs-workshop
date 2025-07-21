import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';
import { FastifyReply } from 'fastify';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    reply.code(HttpStatus.BAD_REQUEST).send({
      reason: exception.message
    });
  }
}
