import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoviesAndScreenings1793985348969
  implements MigrationInterface
{
  name = 'AddMoviesAndScreenings1793985348969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`movies\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(180) NOT NULL,
        \`duration\` int NOT NULL,
        \`date\` date NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`screenings\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`scheduled_at\` datetime NOT NULL,
        \`theater_id\` int NOT NULL,
        \`movie_id\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_screenings_theater\`
          FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`)
          ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`FK_screenings_movie\`
          FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`)
          ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `screenings`');
    await queryRunner.query('DROP TABLE `movies`');
  }
}
