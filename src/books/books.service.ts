import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvVariablesService } from '../configuration/env-variables.service';
import { BookEntity } from './book/book.entity';
import { DomainException } from './domain.exception';
import { CreateBookDto } from './dtos/create-book.dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private booksRepository: Repository<BookEntity>,
    private envVariables: EnvVariablesService
  ) {
    console.log(this.envVariables.get('database_name'));
    console.log(this.envVariables.get('database_server'));
  }

  getAll(): Promise<BookEntity[]> {
    return this.booksRepository.find();
  }

  getById(id: string): Promise<BookEntity | null> {
    return this.booksRepository.findOneBy({ id });
  }

  async create(dto: CreateBookDto): Promise<BookEntity> {
    return this.booksRepository.save({ ...dto, rating: 0, amount: dto.amount ?? 0 });
  }

  order(bookToOrder: BookEntity, dto: { amountOrdered: number }) {
    if (bookToOrder.amount < dto.amountOrdered) {
      throw new DomainException(
        `Order cancelled: ${dto.amountOrdered} copies of "${bookToOrder.title}" have been ordered, but only ${bookToOrder.amount} are available. More will be available, soon!`
      );
    }

    bookToOrder.amount -= dto.amountOrdered;

    return this.booksRepository.save(bookToOrder);
  }

  rate(bookToRate: BookEntity, dto: { newRating: number }) {
    if (dto.newRating < 1 || dto.newRating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${dto.newRating} does not fit in the range 1-5.`
      );
    }

    bookToRate.rating = dto.newRating;

    return this.booksRepository.save(bookToRate);
  }
}
