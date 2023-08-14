/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(191) NOT NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT;
