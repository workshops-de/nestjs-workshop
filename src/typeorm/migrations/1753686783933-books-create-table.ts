import { MigrationInterface, QueryRunner } from 'typeorm';

export class BooksCreateTable1753686783933 implements MigrationInterface {
  name = 'BooksCreateTable1753686783933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "isbn" character varying(20) NOT NULL, "authors" text NOT NULL, "price" real NOT NULL, "amount" real NOT NULL, "rating" real NOT NULL, "thumbnail" text, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
