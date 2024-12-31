/*
  Warnings:

  - The values [SEASON] on the enum `TimeFrame` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimeFrame_new" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');
ALTER TABLE "Goal" ALTER COLUMN "timeFrame" TYPE "TimeFrame_new" USING ("timeFrame"::text::"TimeFrame_new");
ALTER TYPE "TimeFrame" RENAME TO "TimeFrame_old";
ALTER TYPE "TimeFrame_new" RENAME TO "TimeFrame";
DROP TYPE "TimeFrame_old";
COMMIT;
