/*
  Warnings:

  - Added the required column `updatedAt` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
