import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1743878984286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TABLE "user" (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          username varchar(200) NOT NULL,
          avatar varchar(200) NULL,
          fullname varchar(200) NOT NULL,
          email varchar(200) NULL,
          bio varchar(200) NULL,
          password varchar NOT NULL,
          "isBioPublic" boolean NULL,
          "isAvatarPublic" boolean NULL,
          "isLinksPublic" boolean NULL,
          "isUsernamePublic" boolean NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_user_id" PRIMARY KEY (id),
          CONSTRAINT "UQ_user_email" UNIQUE (email),
          CONSTRAINT "UQ_user_name" UNIQUE (username)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
  }
}
