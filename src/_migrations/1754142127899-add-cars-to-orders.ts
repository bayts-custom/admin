import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarsToOrders1754142127899 implements MigrationInterface {
    name = 'AddCarsToOrders1754142127899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "car"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "car_mark_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "car_model_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_032e5b8c370d120b8952cfc3c28" FOREIGN KEY ("car_mark_id") REFERENCES "car_mark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_507dcaba45d48a179029640258d" FOREIGN KEY ("car_model_id") REFERENCES "car_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_507dcaba45d48a179029640258d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_032e5b8c370d120b8952cfc3c28"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "car_model_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "car_mark_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "car" character varying NOT NULL`);
    }

}
