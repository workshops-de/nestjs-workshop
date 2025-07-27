import { BookRatingEntity } from './book-rating.entity';
import { BookEntity } from '../books/book/book.entity';

describe(BookRatingEntity.name, () => {
  it(`fails when the rating is bigger than 5`, () => {
    const rating = 6;
    const book = new BookEntity({
      id: '',
      amount: 0,
      ratings: [],
      rating: 5,
      isbn: '',
      authors: [],
      price: 0,
      title: ''
    });

    expect(() => BookRatingEntity.create(book, rating)).toThrow(
      `Rating discarded: The given rating ${rating} does not fit in the range 1-5.`
    );
  });

  it(`fails when the rating is smaller than 1`, () => {
    const rating = 0;
    const book = new BookEntity({
      id: '',
      amount: 0,
      ratings: [],
      rating: 5,
      isbn: '',
      authors: [],
      price: 0,
      title: ''
    });

    expect(() => BookRatingEntity.create(book, rating)).toThrow(
      `Rating discarded: The given rating ${rating} does not fit in the range 1-5.`
    );
  });

  it.each([1, 2, 3, 4, 5])('succeeds within the range 1-5', (rating: number) => {
    const book = new BookEntity({
      id: '',
      amount: 0,
      ratings: [],
      rating: 5,
      isbn: '',
      authors: [],
      price: 0,
      title: ''
    });

    const bookRating = BookRatingEntity.create(book, rating);

    expect(bookRating.rating).toBe(rating);
  });
});
