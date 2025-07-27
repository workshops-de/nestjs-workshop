import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../books/book/book.entity';
import { DomainException } from '../books/domain.exception';
import { EntityProperties } from '../core/types/entity-properties';

@Entity('book-ratings')
export class BookRatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'smallint' })
  rating: number;

  @ManyToOne(() => BookEntity, book => book.ratings)
  book: BookEntity;

  static create(
    book: BookEntity,
    rating: number
  ): Omit<EntityProperties<BookRatingEntity>, 'id' | 'createdAt'> {
    if (rating < 1 || rating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${rating} does not fit in the range 1-5.`
      );
    }

    return {
      book,
      rating
    };
  }
}
