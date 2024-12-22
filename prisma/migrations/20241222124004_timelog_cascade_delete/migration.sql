-- DropForeignKey
ALTER TABLE "TimeLog" DROP CONSTRAINT "TimeLog_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
