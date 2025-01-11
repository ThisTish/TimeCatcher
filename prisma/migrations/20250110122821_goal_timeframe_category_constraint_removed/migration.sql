-- DropIndex
DROP INDEX "Goal_categoryId_timeFrame_active_key";

-- CreateIndex
CREATE INDEX "Goal_categoryId_timeFrame_idx" ON "Goal"("categoryId", "timeFrame");
