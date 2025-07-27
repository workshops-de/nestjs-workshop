import { Module } from '@nestjs/common';
import { BookRatingsService } from './book-ratings.service';
import { BookRatingsController } from './book-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRatingEntity } from './book-rating.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookRatingEntity]), BooksModule],
  providers: [BookRatingsService],
  controllers: [BookRatingsController]
})
export class BookRatingsModule {}
