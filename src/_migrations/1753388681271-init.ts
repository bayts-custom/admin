import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1753388681271 implements MigrationInterface {
    name = 'Init1753388681271';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "bosses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e1211266746c0f77ea58fc4c743" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "car" character varying NOT NULL, "description" character varying, "full_price" integer, "earn" integer, "expenses" integer, "date_from" date, "date_to" date, "boss_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "orders" ADD CONSTRAINT "FK_51682233e12c4973d883e349181" FOREIGN KEY ("boss_id") REFERENCES "bosses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_51682233e12c4973d883e349181"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "bosses"`);
    }
}
