/*
  Warnings:

  - You are about to drop the column `description` on the `SportsInfrastructure` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `TeamMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SportsInfrastructure" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "public"."TeamMember" DROP COLUMN "description";
