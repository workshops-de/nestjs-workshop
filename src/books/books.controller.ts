import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BookEntity } from './book/book.entity';
import { DomainException } from './domain.exception';

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

  @Put(':id/order')
  order(@Param('id') id: string, @Body() dto: { amountOrdered: number }): void {
    const bookIndex = this.books.findIndex(book => book.id === id);

    if (bookIndex < 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const book = this.books[bookIndex];

    if (book.amount < dto.amountOrdered) {
      throw new DomainException(
        `Order cancelled: ${dto.amountOrdered} copies of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`
      );
    }

    book.amount -= dto.amountOrdered;

    this.books[bookIndex] = book;
  }

  @Put(':id/rate')
  rate(@Param('id') id: string, @Body() dto: { newRating: number }): void {
    if (dto.newRating < 1 || dto.newRating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${dto.newRating} does not fit in the range 1-5.`
      );
    }

    this.books = this.books.map(book => {
      return book.id === id ? { ...book, rating: dto.newRating } : book;
    });
  }
}
