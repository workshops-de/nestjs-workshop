import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BookEntity } from './book/book.entity';
import { DomainException } from './domain.exception';

@Injectable()
export class BooksService {
  private bookCollection: BookEntity[] = [
    new BookEntity({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      rating: 5,
      amount: 1000
    })
  ];

  getAll(): Promise<BookEntity[]> {
    return Promise.resolve(this.bookCollection);
  }

  order(id: string, dto: { amountOrdered: number }) {
    const bookIndex = this.bookCollection.findIndex(book => book.id === id);

    if (bookIndex < 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const book = this.bookCollection[bookIndex];

    if (book.amount < dto.amountOrdered) {
      throw new DomainException(
        `Order cancelled: ${dto.amountOrdered} copies of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`
      );
    }

    book.amount -= dto.amountOrdered;

    this.bookCollection[bookIndex] = book;
  }

  rate(id: string, dto: { newRating: number }) {
    if (dto.newRating < 1 || dto.newRating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${dto.newRating} does not fit in the range 1-5.`
      );
    }

    this.bookCollection = this.bookCollection.map(book => {
      return book.id === id ? { ...book, rating: dto.newRating } : book;
    });
  }
}
