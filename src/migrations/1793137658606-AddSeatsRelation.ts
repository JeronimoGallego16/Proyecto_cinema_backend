import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeatsRelation1793137658606 implements MigrationInterface {
  name = 'AddSeatsRelation1793137658606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`seats\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`location\` varchar(20) NOT NULL,
        \`reclining\` tinyint NOT NULL,
        \`theater_id\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_seats_theater\`
          FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`)
          ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `seats`');
  }
}
