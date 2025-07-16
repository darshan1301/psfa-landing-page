/*
  Warnings:

  - You are about to drop the column `yearOfExperience` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `experience` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "yearOfExperience",
ADD COLUMN     "experience" TEXT NOT NULL;
