import {MigrationInterface, QueryRunner} from "typeorm";

export class addMeetupEntity1660176525779 implements MigrationInterface {
    name = 'addMeetupEntity1660176525779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_984b6626c42871feba15a3c8d15\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` CHANGE \`climbRequestId\` \`climbMeetupId\` char(36) NULL`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climb_meetup\` (\`id\` char(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbRequestId\` char(36) NULL, UNIQUE INDEX \`REL_620c5cef6987a0f15e0e800fcb\` (\`climbRequestId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\` (\`userId\` char(36) NOT NULL, \`climbMeetupId\` char(36) NOT NULL, INDEX \`IDX_c3b442be909721f6d3b0dd5ae6\` (\`userId\`), INDEX \`IDX_84230574baee79142575c27f47\` (\`climbMeetupId\`), PRIMARY KEY (\`userId\`, \`climbMeetupId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbMeetupId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbRequestId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbMeetupId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_984b6626c42871feba15a3c8d15\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_1932fe481a9b69cae4a7fcf800c\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`rpf_local2\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_meetup\` ADD CONSTRAINT \`FK_620c5cef6987a0f15e0e800fcbb\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\` ADD CONSTRAINT \`FK_c3b442be909721f6d3b0dd5ae67\` FOREIGN KEY (\`userId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\` ADD CONSTRAINT \`FK_84230574baee79142575c27f476\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`rpf_local2\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\` DROP FOREIGN KEY \`FK_84230574baee79142575c27f476\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\` DROP FOREIGN KEY \`FK_c3b442be909721f6d3b0dd5ae67\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_meetup\` DROP FOREIGN KEY \`FK_620c5cef6987a0f15e0e800fcbb\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_1932fe481a9b69cae4a7fcf800c\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_984b6626c42871feba15a3c8d15\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbMeetupId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP COLUMN \`climbRequestId\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD \`climbMeetupId\` char(36) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_84230574baee79142575c27f47\` ON \`rpf_local2\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3b442be909721f6d3b0dd5ae6\` ON \`rpf_local2\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP INDEX \`REL_620c5cef6987a0f15e0e800fcb\` ON \`rpf_local2\`.\`climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climb_meetup\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` CHANGE \`climbMeetupId\` \`climbRequestId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_984b6626c42871feba15a3c8d15\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
