import {MigrationInterface, QueryRunner} from "typeorm";

export class addReadToMessage1660217547962 implements MigrationInterface {
    name = 'addReadToMessage1660217547962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_1932fe481a9b69cae4a7fcf800c\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_984b6626c42871feba15a3c8d15\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` CHANGE \`climbRequestId\` \`read\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbMeetupId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`read\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbRequestId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`read\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbMeetupId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_984b6626c42871feba15a3c8d15\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_1932fe481a9b69cae4a7fcf800c\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`rpf_local2\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_1932fe481a9b69cae4a7fcf800c\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_984b6626c42871feba15a3c8d15\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbMeetupId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`read\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbRequestId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`read\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbMeetupId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` CHANGE \`read\` \`climbRequestId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_984b6626c42871feba15a3c8d15\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_1932fe481a9b69cae4a7fcf800c\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`rpf_local2\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
