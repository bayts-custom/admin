import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderAddFields1760891121627 implements MigrationInterface {
    name = 'OrderAddFields1760891121627';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "film-prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "filmId" uuid NOT NULL, "amount" bigint NOT NULL, CONSTRAINT "PK_582e71975f9be0a2d721301d3f5" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "films" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "earn"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "film_price" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "place_price" integer`);
        await queryRunner.query(`CREATE TYPE "public"."orders_work_type_enum" AS ENUM('full', 'front', 'details')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "work_type" "public"."orders_work_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "details" jsonb`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "film_length" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "complicity" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "review" boolean`);
        await queryRunner.query(
            `ALTER TABLE "film-prices" ADD CONSTRAINT "FK_2d6ab74b4a7c5fdf1606925b76a" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film-prices" DROP CONSTRAINT "FK_2d6ab74b4a7c5fdf1606925b76a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "review"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "complicity"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "film_length"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "details"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "work_type"`);
        await queryRunner.query(`DROP TYPE "public"."orders_work_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "place_price"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "film_price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "earn" integer`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP TABLE "film-prices"`);
    }
}
