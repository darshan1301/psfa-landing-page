/*
  Warnings:

  - You are about to drop the column `capacity` on the `SportsInfrastructure` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `SportsInfrastructure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SportsInfrastructure" DROP COLUMN "capacity",
DROP COLUMN "isActive",
ADD COLUMN     "Amenities" TEXT[],
ADD COLUMN     "Area" INTEGER;
