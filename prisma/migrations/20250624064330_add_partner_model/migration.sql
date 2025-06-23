-- CreateTable
CREATE TABLE `Partner` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `message` VARCHAR(250) NULL,
    `type` ENUM('Volunteer', 'Partner') NOT NULL DEFAULT 'Partner',
    `status` ENUM('READ', 'UNREAD', 'DELETED') NOT NULL DEFAULT 'UNREAD',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NOT NULL DEFAULT 'null',

    INDEX `Partner_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
