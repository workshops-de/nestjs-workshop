import { Controller, Get } from '@nestjs/common';
import { BookEntity } from './book/book.entity';
import { randomUUID } from 'crypto';

@Controller('books')
export class BooksController {
  private books: BookEntity[] = [
    new BookEntity({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      amount: 1000,
      rating: 5
    })
  ];

  @Get()
  getAll(): Promise<BookEntity[]> {
    return Promise.resolve(this.books);
  }
}
