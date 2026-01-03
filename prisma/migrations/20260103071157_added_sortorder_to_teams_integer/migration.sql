/*
  Warnings:

  - The `sortOrder` column on the `TeamMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "sortOrder",
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 1;
