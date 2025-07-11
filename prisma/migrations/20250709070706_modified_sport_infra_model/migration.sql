/*
  Warnings:

  - Added the required column `description` to the `SportsInfrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SportsInfrastructure" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL;
