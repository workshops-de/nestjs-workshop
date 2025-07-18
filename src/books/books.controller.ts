import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BookEntity } from './book/book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll(): Promise<BookEntity[]> {
    return this.booksService.getAll();
  }

  @Put(':id/order')
  order(@Param('id') id: string, @Body() dto: { amountOrdered: number }): void {
    this.booksService.order(id, dto);
  }

  @Put(':id/rate')
  rate(@Param('id') id: string, @Body() dto: { newRating: number }): void {
    this.booksService.rate(id, dto);
  }
}
