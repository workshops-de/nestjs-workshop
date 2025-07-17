import { EntityProperties } from '../../core/types/entity-properties';

export class BookEntity {
  public id: string;
  public title: string;
  public isbn: string;
  public authors: string[];
  public price: number;
  public amount: number;
  public rating: number;
  public thumbnail?: string;

  constructor(props?: EntityProperties<BookEntity>) {
    if (!props) return;

    Object.assign(this, props);
  }
}
