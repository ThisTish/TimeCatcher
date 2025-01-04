/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,timeFrame,active]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Goal_categoryId_timeFrame_active_key" ON "Goal"("categoryId", "timeFrame", "active");
