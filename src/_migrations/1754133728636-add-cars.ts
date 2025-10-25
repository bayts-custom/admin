import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCars1754133728636 implements MigrationInterface {
    name = 'AddCars1754133728636';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "car_mark" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "rus_name" character varying NOT NULL, "country" character varying NOT NULL, "popular" boolean NOT NULL, CONSTRAINT "PK_e2c411422dcfc537bf11a23c5ef" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "car_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "rus_name" character varying NOT NULL, "class" character varying NOT NULL, "year_from" integer, "year_to" integer, "mark_id" uuid, CONSTRAINT "PK_525071eea12c671d67e35a5cbc8" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "car_model" ADD CONSTRAINT "FK_11207e081b801eaf71a06878138" FOREIGN KEY ("mark_id") REFERENCES "car_mark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_model" DROP CONSTRAINT "FK_11207e081b801eaf71a06878138"`);
        await queryRunner.query(`DROP TABLE "car_model"`);
        await queryRunner.query(`DROP TABLE "car_mark"`);
    }
}
