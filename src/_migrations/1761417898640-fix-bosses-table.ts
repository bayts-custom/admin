import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixBossesTable1761417898640 implements MigrationInterface {
    name = 'FixBossesTable1761417898640';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_51682233e12c4973d883e349181"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "film_id" uuid`);
        await queryRunner.query(
            `ALTER TABLE "orders" ADD CONSTRAINT "FK_ba54f54cd3cd5c9a1860ccbf2fb" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "orders" ADD CONSTRAINT "FK_51682233e12c4973d883e349181" FOREIGN KEY ("boss_id") REFERENCES "bosses"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_51682233e12c4973d883e349181"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_ba54f54cd3cd5c9a1860ccbf2fb"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "film_id"`);
        await queryRunner.query(
            `ALTER TABLE "orders" ADD CONSTRAINT "FK_51682233e12c4973d883e349181" FOREIGN KEY ("boss_id") REFERENCES "bosses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
