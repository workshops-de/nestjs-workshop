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
    const newRating = BookRatingEntity.create(book, dto.rating);

    return this.bookRatingRepository.save(newRating);
  }
}
