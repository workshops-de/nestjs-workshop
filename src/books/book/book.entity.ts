import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityProperties } from '../../core/types/entity-properties';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  public title: string;

  @Column({ type: 'varchar', length: 20 })
  public isbn: string;

  @Column({ type: 'simple-array' })
  public authors: string[];

  @Column({ type: 'real' })
  public price: number;

  @Column({ type: 'real' })
  public amount: number;

  @Column({ type: 'real' })
  public rating: number;

  @Column({ type: 'text', nullable: true })
  public thumbnail?: string;

  constructor(props?: EntityProperties<BookEntity>) {
    if (!props) return;

    Object.assign(this, props);
  }
}
