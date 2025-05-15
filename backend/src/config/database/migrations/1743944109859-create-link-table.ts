import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLinkTable1743944109859 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TABLE link (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar(256) NOT NULL,
            description varchar(512) NULL,
            category varchar(50) NOT NULL,
            "userId" uuid,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT link_pk PRIMARY KEY (id),
            CONSTRAINT "FK_link_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "link";`);
  }
}
