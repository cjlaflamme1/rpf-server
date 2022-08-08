import {MigrationInterface, QueryRunner} from "typeorm";

export class populateDB1659916587596 implements MigrationInterface {
    name = 'populateDB1659916587596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climber_profile\` (\`id\` char(36) NOT NULL, \`climberBio\` text NULL, \`trOnly\` tinyint NOT NULL, \`leadCapable\` tinyint NOT NULL, \`boulderer\` tinyint NOT NULL, \`trWarmup\` varchar(255) NULL, \`trOnsight\` varchar(255) NULL, \`trRedpoint\` varchar(255) NULL, \`leadWarmup\` varchar(255) NULL, \`leadOnsight\` varchar(255) NULL, \`leadRedpoint\` varchar(255) NULL, \`boulderWarmup\` varchar(255) NULL, \`boulderOnsight\` varchar(255) NULL, \`boulderRedpoint\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`user\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`location\` varchar(255) NULL, \`shortBio\` text NULL, \`profilePhoto\` varchar(255) NULL, \`finderVisibility\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbingProfileId\` char(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_1e1ab1c9165082903aa330d360\` (\`climbingProfileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climb_availability_scheduled\` (\`id\` char(36) NOT NULL, \`startDateTime\` datetime NOT NULL, \`endDateTime\` datetime NOT NULL, \`areas\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`initialUserId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climb_message\` (\`id\` char(36) NOT NULL, \`message\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbRequestId\` char(36) NULL, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climb_request\` (\`id\` char(36) NOT NULL, \`initialMessage\` text NULL, \`targetAccepted\` tinyint NULL, \`targetMessageResponse\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`initiatingEntryId\` char(36) NULL, \`initiatingUserId\` char(36) NULL, \`targetScheduledRequestId\` char(36) NULL, \`targetGenRequestId\` char(36) NULL, \`targetUserId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rpf_local2\`.\`climb_availability_gen\` (\`id\` char(36) NOT NULL, \`day\` varchar(255) NOT NULL, \`startHour\` int NOT NULL, \`startMinute\` int NOT NULL, \`startAMPM\` varchar(255) NOT NULL, \`finishHour\` int NOT NULL, \`finishMinute\` int NOT NULL, \`areas\` varchar(255) NOT NULL, \`finishAMPM\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user\` ADD CONSTRAINT \`FK_1e1ab1c9165082903aa330d360f\` FOREIGN KEY (\`climbingProfileId\`) REFERENCES \`rpf_local2\`.\`climber_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_availability_scheduled\` ADD CONSTRAINT \`FK_d3ca9c48ecf358df91b11fa00f1\` FOREIGN KEY (\`initialUserId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_984b6626c42871feba15a3c8d15\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`rpf_local2\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` ADD CONSTRAINT \`FK_dc6be837350bb073f26e5366f38\` FOREIGN KEY (\`userId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` ADD CONSTRAINT \`FK_68b66aac02f91aedb7fb2f5637d\` FOREIGN KEY (\`initiatingEntryId\`) REFERENCES \`rpf_local2\`.\`climb_availability_scheduled\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` ADD CONSTRAINT \`FK_c6785120c41c6a3c75851aae9f2\` FOREIGN KEY (\`initiatingUserId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` ADD CONSTRAINT \`FK_d5a85d66aad9009ae1cacc6c2c9\` FOREIGN KEY (\`targetScheduledRequestId\`) REFERENCES \`rpf_local2\`.\`climb_availability_scheduled\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` ADD CONSTRAINT \`FK_d7deb249e82a00d582dea82c23b\` FOREIGN KEY (\`targetGenRequestId\`) REFERENCES \`rpf_local2\`.\`climb_availability_gen\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` ADD CONSTRAINT \`FK_877860e36bf34cb6ce8f762470a\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_availability_gen\` ADD CONSTRAINT \`FK_5cb9e873e5e97b783b418956164\` FOREIGN KEY (\`userId\`) REFERENCES \`rpf_local2\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_availability_gen\` DROP FOREIGN KEY \`FK_5cb9e873e5e97b783b418956164\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` DROP FOREIGN KEY \`FK_877860e36bf34cb6ce8f762470a\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` DROP FOREIGN KEY \`FK_d7deb249e82a00d582dea82c23b\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` DROP FOREIGN KEY \`FK_d5a85d66aad9009ae1cacc6c2c9\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` DROP FOREIGN KEY \`FK_c6785120c41c6a3c75851aae9f2\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_request\` DROP FOREIGN KEY \`FK_68b66aac02f91aedb7fb2f5637d\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_dc6be837350bb073f26e5366f38\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_message\` DROP FOREIGN KEY \`FK_984b6626c42871feba15a3c8d15\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`climb_availability_scheduled\` DROP FOREIGN KEY \`FK_d3ca9c48ecf358df91b11fa00f1\``);
        await queryRunner.query(`ALTER TABLE \`rpf_local2\`.\`user\` DROP FOREIGN KEY \`FK_1e1ab1c9165082903aa330d360f\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climb_availability_gen\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climb_request\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climb_message\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climb_availability_scheduled\``);
        await queryRunner.query(`DROP INDEX \`REL_1e1ab1c9165082903aa330d360\` ON \`rpf_local2\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`rpf_local2\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`rpf_local2\`.\`climber_profile\``);
    }

}
