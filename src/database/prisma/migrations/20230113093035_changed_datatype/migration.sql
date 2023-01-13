/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "time" SET DATA TYPE VARCHAR(255);
