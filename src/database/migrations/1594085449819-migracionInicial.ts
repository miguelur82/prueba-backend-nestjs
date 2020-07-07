import {MigrationInterface, QueryRunner} from "typeorm";

export class migracionInicial1594085449819 implements MigrationInterface {
    name = 'migracionInicial1594085449819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_details` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NULL, `lastname` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(25) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `detail_id` int NOT NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `REL_9fc134ca20766e165ad650ee74` (`detail_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `books` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `description` varchar(500) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles` (`usersId` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_99b019339f52c63ae615358738` (`usersId`), INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_books` (`usersId` int NOT NULL, `booksId` int NOT NULL, INDEX `IDX_e8384931aac8ac91dda9d1f83c` (`usersId`), INDEX `IDX_feb9d8083aefec5c5cc9208263` (`booksId`), PRIMARY KEY (`usersId`, `booksId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_9fc134ca20766e165ad650ee740` FOREIGN KEY (`detail_id`) REFERENCES `user_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_99b019339f52c63ae6153587380` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_books` ADD CONSTRAINT `FK_e8384931aac8ac91dda9d1f83c8` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_books` ADD CONSTRAINT `FK_feb9d8083aefec5c5cc9208263c` FOREIGN KEY (`booksId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_books` DROP FOREIGN KEY `FK_feb9d8083aefec5c5cc9208263c`");
        await queryRunner.query("ALTER TABLE `user_books` DROP FOREIGN KEY `FK_e8384931aac8ac91dda9d1f83c8`");
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`");
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_99b019339f52c63ae6153587380`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_9fc134ca20766e165ad650ee740`");
        await queryRunner.query("DROP INDEX `IDX_feb9d8083aefec5c5cc9208263` ON `user_books`");
        await queryRunner.query("DROP INDEX `IDX_e8384931aac8ac91dda9d1f83c` ON `user_books`");
        await queryRunner.query("DROP TABLE `user_books`");
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`");
        await queryRunner.query("DROP INDEX `IDX_99b019339f52c63ae615358738` ON `user_roles`");
        await queryRunner.query("DROP TABLE `user_roles`");
        await queryRunner.query("DROP TABLE `books`");
        await queryRunner.query("DROP INDEX `REL_9fc134ca20766e165ad650ee74` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `user_details`");
    }

}
