/*
  Warnings:

  - You are about to drop the column `active` on the `TimeLog` table. All the data in the column will be lost.
  - Added the required column `active` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `running` to the `TimeLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TimeLog" DROP COLUMN "active",
ADD COLUMN     "running" BOOLEAN NOT NULL;
