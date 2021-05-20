import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1621485238023 implements MigrationInterface {
    name = 'InitialMigration1621485238023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `employment_types` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `skills` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_skill` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `job_id` int UNSIGNED NULL, `skill_id` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `jobs` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `title` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `employment_type_id` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_applications` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `phone_number` varchar(20) NOT NULL, `address` varchar(255) NOT NULL, `city` varchar(30) NOT NULL, `province` varchar(30) NOT NULL, `postal_code` varchar(30) NOT NULL, `country` varchar(50) NOT NULL, `job_id` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `levels` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `created_at` int NULL, `updated_at` int NULL, `username` varchar(30) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `job_skill` ADD CONSTRAINT `FK_57d07c4be198a93a91fa8479819` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `job_skill` ADD CONSTRAINT `FK_380feeef9ae48bb593b5acd9232` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `jobs` ADD CONSTRAINT `FK_48dee9a5bab8ecd6476e90bd43f` FOREIGN KEY (`employment_type_id`) REFERENCES `employment_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `job_applications` ADD CONSTRAINT `FK_99292c6cd0ed428e8f5b4e22958` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `job_applications` DROP FOREIGN KEY `FK_99292c6cd0ed428e8f5b4e22958`");
        await queryRunner.query("ALTER TABLE `jobs` DROP FOREIGN KEY `FK_48dee9a5bab8ecd6476e90bd43f`");
        await queryRunner.query("ALTER TABLE `job_skill` DROP FOREIGN KEY `FK_380feeef9ae48bb593b5acd9232`");
        await queryRunner.query("ALTER TABLE `job_skill` DROP FOREIGN KEY `FK_57d07c4be198a93a91fa8479819`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `levels`");
        await queryRunner.query("DROP TABLE `job_applications`");
        await queryRunner.query("DROP TABLE `jobs`");
        await queryRunner.query("DROP TABLE `job_skill`");
        await queryRunner.query("DROP TABLE `skills`");
        await queryRunner.query("DROP TABLE `employment_types`");
    }

}
