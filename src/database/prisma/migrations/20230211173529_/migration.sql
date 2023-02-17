/*
  Warnings:

  - You are about to drop the column `dms` on the `notification_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_settings" DROP COLUMN "dms",
ADD COLUMN     "directMessages" BOOLEAN NOT NULL DEFAULT false;
