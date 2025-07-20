import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }

    const errorMessage = z.prettifyError(result.error);
    throw new BadRequestException(errorMessage);
  }
}
