import {MigrationInterface, QueryRunner} from "typeorm";

export class addPushToken1661030379296 implements MigrationInterface {
    name = 'addPushToken1661030379296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user\` ADD \`expoPushToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nhcpf\`.\`user\` DROP COLUMN \`expoPushToken\``);
    }

}
