import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCinemaSchema1793135320152 implements MigrationInterface {
  name = 'InitCinemaSchema1793135320152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`projectors\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`brand\` varchar(120) NOT NULL,
        \`high\` int NOT NULL,
        \`width\` int NOT NULL,
        \`theater_id\` int NULL,
        UNIQUE INDEX \`UQ_projectors_theater_id\` (\`theater_id\`),
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_projectors_theater\`
          FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`)
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `projectors`');
  }
}
