import {MigrationInterface, QueryRunner} from "typeorm";

export class initiateDB1660511847216 implements MigrationInterface {
    name = 'initiateDB1660511847216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climb_message\` (\`id\` char(36) NOT NULL, \`message\` text NOT NULL, \`read\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbMeetupId\` char(36) NULL, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climb_meetup\` (\`id\` char(36) NOT NULL, \`climbDate\` datetime NOT NULL, \`climbStartTime\` datetime NULL, \`climbEndTime\` datetime NULL, \`climbLocation\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbRequestId\` char(36) NULL, UNIQUE INDEX \`REL_620c5cef6987a0f15e0e800fcb\` (\`climbRequestId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climber_profile\` (\`id\` char(36) NOT NULL, \`climberBio\` text NULL, \`trOnly\` tinyint NOT NULL, \`leadCapable\` tinyint NOT NULL, \`boulderer\` tinyint NOT NULL, \`trWarmup\` varchar(255) NULL, \`trOnsight\` varchar(255) NULL, \`trRedpoint\` varchar(255) NULL, \`leadWarmup\` varchar(255) NULL, \`leadOnsight\` varchar(255) NULL, \`leadRedpoint\` varchar(255) NULL, \`boulderWarmup\` varchar(255) NULL, \`boulderOnsight\` varchar(255) NULL, \`boulderRedpoint\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`user\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`location\` varchar(255) NULL, \`shortBio\` text NULL, \`profilePhoto\` varchar(255) NULL, \`finderVisibility\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`climbingProfileId\` char(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_1e1ab1c9165082903aa330d360\` (\`climbingProfileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climb_availability_scheduled\` (\`id\` char(36) NOT NULL, \`startDateTime\` datetime NOT NULL, \`endDateTime\` datetime NOT NULL, \`areas\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`initialUserId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climb_request\` (\`id\` char(36) NOT NULL, \`initialMessage\` text NULL, \`targetAccepted\` tinyint NULL, \`targetMessageResponse\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`initiatingEntryId\` char(36) NULL, \`initiatingUserId\` char(36) NULL, \`targetScheduledRequestId\` char(36) NULL, \`targetGenRequestId\` char(36) NULL, \`targetUserId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`climb_availability_gen\` (\`id\` char(36) NOT NULL, \`day\` varchar(255) NOT NULL, \`startHour\` int NOT NULL, \`startMinute\` int NOT NULL, \`startAMPM\` varchar(255) NOT NULL, \`finishHour\` int NOT NULL, \`finishMinute\` int NOT NULL, \`areas\` varchar(255) NOT NULL, \`finishAMPM\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\` (\`userId\` char(36) NOT NULL, \`climbMeetupId\` char(36) NOT NULL, INDEX \`IDX_c3b442be909721f6d3b0dd5ae6\` (\`userId\`), INDEX \`IDX_84230574baee79142575c27f47\` (\`climbMeetupId\`), PRIMARY KEY (\`userId\`, \`climbMeetupId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_message\` ADD CONSTRAINT \`FK_1932fe481a9b69cae4a7fcf800c\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`nhcpf\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_message\` ADD CONSTRAINT \`FK_dc6be837350bb073f26e5366f38\` FOREIGN KEY (\`userId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_meetup\` ADD CONSTRAINT \`FK_620c5cef6987a0f15e0e800fcbb\` FOREIGN KEY (\`climbRequestId\`) REFERENCES \`nhcpf\`.\`climb_request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user\` ADD CONSTRAINT \`FK_1e1ab1c9165082903aa330d360f\` FOREIGN KEY (\`climbingProfileId\`) REFERENCES \`nhcpf\`.\`climber_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_availability_scheduled\` ADD CONSTRAINT \`FK_d3ca9c48ecf358df91b11fa00f1\` FOREIGN KEY (\`initialUserId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` ADD CONSTRAINT \`FK_68b66aac02f91aedb7fb2f5637d\` FOREIGN KEY (\`initiatingEntryId\`) REFERENCES \`nhcpf\`.\`climb_availability_scheduled\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` ADD CONSTRAINT \`FK_c6785120c41c6a3c75851aae9f2\` FOREIGN KEY (\`initiatingUserId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` ADD CONSTRAINT \`FK_d5a85d66aad9009ae1cacc6c2c9\` FOREIGN KEY (\`targetScheduledRequestId\`) REFERENCES \`nhcpf\`.\`climb_availability_scheduled\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` ADD CONSTRAINT \`FK_d7deb249e82a00d582dea82c23b\` FOREIGN KEY (\`targetGenRequestId\`) REFERENCES \`nhcpf\`.\`climb_availability_gen\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` ADD CONSTRAINT \`FK_877860e36bf34cb6ce8f762470a\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_availability_gen\` ADD CONSTRAINT \`FK_5cb9e873e5e97b783b418956164\` FOREIGN KEY (\`userId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\` ADD CONSTRAINT \`FK_c3b442be909721f6d3b0dd5ae67\` FOREIGN KEY (\`userId\`) REFERENCES \`nhcpf\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\` ADD CONSTRAINT \`FK_84230574baee79142575c27f476\` FOREIGN KEY (\`climbMeetupId\`) REFERENCES \`nhcpf\`.\`climb_meetup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\` DROP FOREIGN KEY \`FK_84230574baee79142575c27f476\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\` DROP FOREIGN KEY \`FK_c3b442be909721f6d3b0dd5ae67\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_availability_gen\` DROP FOREIGN KEY \`FK_5cb9e873e5e97b783b418956164\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` DROP FOREIGN KEY \`FK_877860e36bf34cb6ce8f762470a\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` DROP FOREIGN KEY \`FK_d7deb249e82a00d582dea82c23b\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` DROP FOREIGN KEY \`FK_d5a85d66aad9009ae1cacc6c2c9\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` DROP FOREIGN KEY \`FK_c6785120c41c6a3c75851aae9f2\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_request\` DROP FOREIGN KEY \`FK_68b66aac02f91aedb7fb2f5637d\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_availability_scheduled\` DROP FOREIGN KEY \`FK_d3ca9c48ecf358df91b11fa00f1\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user\` DROP FOREIGN KEY \`FK_1e1ab1c9165082903aa330d360f\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_meetup\` DROP FOREIGN KEY \`FK_620c5cef6987a0f15e0e800fcbb\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_message\` DROP FOREIGN KEY \`FK_dc6be837350bb073f26e5366f38\``);
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`climb_message\` DROP FOREIGN KEY \`FK_1932fe481a9b69cae4a7fcf800c\``);
        await queryRunner.query(`DROP INDEX \`IDX_84230574baee79142575c27f47\` ON \`nhcpf\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3b442be909721f6d3b0dd5ae6\` ON \`nhcpf\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`user_climb_meetups_climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climb_availability_gen\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climb_request\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climb_availability_scheduled\``);
        await queryRunner.query(`DROP INDEX \`REL_1e1ab1c9165082903aa330d360\` ON \`nhcpf\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`nhcpf\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climber_profile\``);
        await queryRunner.query(`DROP INDEX \`REL_620c5cef6987a0f15e0e800fcb\` ON \`nhcpf\`.\`climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climb_meetup\``);
        await queryRunner.query(`DROP TABLE \`nhcpf\`.\`climb_message\``);
    }

}
