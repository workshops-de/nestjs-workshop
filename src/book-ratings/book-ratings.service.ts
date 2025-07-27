import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRatingEntity } from './book-rating.entity';
import { Repository } from 'typeorm';
import { BookEntity } from '../books/book/book.entity';
import { DomainException } from '../books/domain.exception';

@Injectable()
export class BookRatingsService {
  constructor(
    @InjectRepository(BookRatingEntity) private bookRatingRepository: Repository<BookRatingEntity>
  ) {}

  async create(book: BookEntity, dto: { rating: number }): Promise<BookRatingEntity> {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${dto.rating} does not fit in the range 1-5.`
      );
    }

    return this.bookRatingRepository.save({
      book,
      rating: dto.rating,
      createdAt: new Date()
    });
  }
}
