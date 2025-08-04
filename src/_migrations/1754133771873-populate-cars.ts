import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateCars1754133771873 implements MigrationInterface {
    name = 'PopulateCars1754133771873';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fs = require('fs');
        const marks = fs.readFileSync('marks.txt', 'utf-8');

        await queryRunner.query(`INSERT INTO car_mark (id, name, rus_name, country, popular) VALUES ${marks}`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "car_mark"`);
    }
}
