/*
  Warnings:

  - Added the required column `workoutType` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Day` ADD COLUMN `workoutType` VARCHAR(191) NOT NULL;
