-- CreateEnum
CREATE TYPE "SportStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "status" "SportStatus" NOT NULL DEFAULT 'ACTIVE';
