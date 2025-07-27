import { MigrationInterface, QueryRunner } from "typeorm";

export class BookRatingsCreateTable1753686859777 implements MigrationInterface {
    name = 'BookRatingsCreateTable1753686859777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book-ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "rating" smallint NOT NULL, "bookId" uuid, CONSTRAINT "PK_d21d688ff7c47445f6e59d677f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book-ratings" ADD CONSTRAINT "FK_622e932bc23e64f2d6ecafcddd0" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-ratings" DROP CONSTRAINT "FK_622e932bc23e64f2d6ecafcddd0"`);
        await queryRunner.query(`DROP TABLE "book-ratings"`);
    }

}
