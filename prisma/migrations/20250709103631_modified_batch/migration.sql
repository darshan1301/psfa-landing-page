/*
  Warnings:

  - Added the required column `startTime` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
