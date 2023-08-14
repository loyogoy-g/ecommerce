/*
  Warnings:

  - You are about to alter the column `image` on the `product` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `account` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product` MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `createdAt` DROP DEFAULT;
