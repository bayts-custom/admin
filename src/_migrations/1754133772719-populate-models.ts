import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateModels1754133772719 implements MigrationInterface {
    name = 'PopulateModels1754133772719';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fs = require('fs');
        const models = fs.readFileSync('models.txt', 'utf-8');

        const lines = models.split('\n');
        let currLine = 0;

        while (currLine < lines.length) {
            await queryRunner.query(
                `INSERT INTO car_model (name, rus_name, class, year_from, year_to, mark_id) VALUES ${lines.slice(currLine, currLine + 50).join(',')}`,
            );
            currLine = currLine + 50;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "car_model"`);
    }
}
