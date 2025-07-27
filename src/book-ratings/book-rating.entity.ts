import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../books/book/book.entity';

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
}
