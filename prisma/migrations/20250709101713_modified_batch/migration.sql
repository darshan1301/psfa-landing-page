-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_sportsAcademyId_fkey";

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_sportsAcademyId_fkey" FOREIGN KEY ("sportsAcademyId") REFERENCES "SportsAcademy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
