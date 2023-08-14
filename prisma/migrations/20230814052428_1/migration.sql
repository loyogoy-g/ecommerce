/*
  Warnings:

  - You are about to alter the column `ratings` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `rate` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `rate` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    MODIFY `ratings` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAdmin` BOOLEAN NOT NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT;
