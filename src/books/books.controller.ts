import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
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
  async order(@Param('id') id: string, @Body() dto: { amountOrdered: number }): Promise<void> {
    const book = await this.booksService.getById(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.booksService.order(book, dto);
  }

  @Put(':id/rate')
  async rate(@Param('id') id: string, @Body() dto: { newRating: number }): Promise<void> {
    const book = await this.booksService.getById(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.booksService.rate(book, dto);
  }
}
