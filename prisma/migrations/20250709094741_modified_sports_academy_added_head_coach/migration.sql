/*
  Warnings:

  - Added the required column `headCoach` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "description" TEXT,
ADD COLUMN     "headCoach" TEXT NOT NULL,
ADD COLUMN     "sport" TEXT NOT NULL;
