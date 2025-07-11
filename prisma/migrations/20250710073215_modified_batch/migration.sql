/*
  Warnings:

  - Added the required column `endTime` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
