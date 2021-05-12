import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageUser1620819886996 implements MigrationInterface {
    name = 'MessageUser1620819886996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_627bdb88ff88b446023474e4261"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "REL_4d8b2643c29b31e55b13b9213a"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "toId"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "REL_627bdb88ff88b446023474e426"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "fromId"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "to_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "from_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_d8762108151bf40db7c99a98612" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_ad62e2ac4a556ceaf98330b2910" FOREIGN KEY ("from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_ad62e2ac4a556ceaf98330b2910"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_d8762108151bf40db7c99a98612"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "from_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "to_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "fromId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "REL_627bdb88ff88b446023474e426" UNIQUE ("fromId")
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "toId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "REL_4d8b2643c29b31e55b13b9213a" UNIQUE ("toId")
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_627bdb88ff88b446023474e4261" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
