import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeatsRelation1793382615049 implements MigrationInterface {
    name = 'AddSeatsRelation1793382615049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_seats_theater\` ON \`seats\``);
        await queryRunner.query(`DROP INDEX \`IDX_39723a507706f581bc5928ff8f\` ON \`projectors\``);
        await queryRunner.query(`ALTER TABLE \`projectors\` ADD UNIQUE INDEX \`IDX_39723a507706f581bc5928ff8f\` (\`theater_id\`)`);
        await queryRunner.query(`ALTER TABLE \`projectors\` ADD UNIQUE INDEX \`IDX_39723a507706f581bc5928ff8f\` (\`theater_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_39723a507706f581bc5928ff8f\` ON \`projectors\` (\`theater_id\`)`);
        await queryRunner.query(`ALTER TABLE \`seats\` ADD CONSTRAINT \`FK_0e2547501640e2c3c68c2036277\` FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projectors\` ADD CONSTRAINT \`FK_39723a507706f581bc5928ff8f3\` FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projectors\` DROP FOREIGN KEY \`FK_39723a507706f581bc5928ff8f3\``);
        await queryRunner.query(`ALTER TABLE \`seats\` DROP FOREIGN KEY \`FK_0e2547501640e2c3c68c2036277\``);
        await queryRunner.query(`DROP INDEX \`REL_39723a507706f581bc5928ff8f\` ON \`projectors\``);
        await queryRunner.query(`ALTER TABLE \`projectors\` DROP INDEX \`IDX_39723a507706f581bc5928ff8f\``);
        await queryRunner.query(`ALTER TABLE \`projectors\` DROP INDEX \`IDX_39723a507706f581bc5928ff8f\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_39723a507706f581bc5928ff8f\` ON \`projectors\` (\`theater_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_seats_theater\` ON \`seats\` (\`theater_id\`)`);
    }

}
