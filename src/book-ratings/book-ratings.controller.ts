import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { BookRatingEntity } from './book-rating.entity';
import { BookRatingsService } from './book-ratings.service';
import { BooksService } from '../books/books.service';

@Controller('book-ratings')
export class BookRatingsController {
  constructor(
    private booksService: BooksService,
    private bookRatingsService: BookRatingsService
  ) {}

  @Post('/books/:id')
  async create(
    @Param('id') bookId: string,
    @Body() dto: { rating: number }
  ): Promise<Pick<BookRatingEntity, 'id'>> {
    const book = await this.booksService.getById(bookId);

    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    const createdBookRating = await this.bookRatingsService.create(book, dto);

    return { id: createdBookRating.id };
  }
}
