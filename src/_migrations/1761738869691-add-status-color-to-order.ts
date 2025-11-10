import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusColorToOrder1761738869691 implements MigrationInterface {
    name = 'AddStatusColorToOrder1761738869691';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."orders_status_enum" AS ENUM('new', 'car_arrived', 'in_progress', 'blocked', 'done')`,
        );

        await queryRunner.query(
            `CREATE TABLE "order_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL, "order_id" uuid, CONSTRAINT "PK_fb7850e731ffae56f7b7d4fad0d" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'new'`,
        );
        await queryRunner.query(`ALTER TABLE "orders" ADD "color" character varying`);
        await queryRunner.query(
            `ALTER TABLE "order_logs" ADD CONSTRAINT "FK_03afb74d68d64c9d3271bcd7012" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_logs" DROP CONSTRAINT "FK_03afb74d68d64c9d3271bcd7012"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TABLE "order_logs"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }
}
