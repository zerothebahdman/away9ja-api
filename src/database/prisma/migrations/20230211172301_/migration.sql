/*
  Warnings:

  - You are about to drop the column `user_id` on the `notification_settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `notification_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "notification_settings" DROP CONSTRAINT "notification_settings_user_id_fkey";

-- DropIndex
DROP INDEX "notification_settings_user_id_key";

-- AlterTable
ALTER TABLE "notification_settings" DROP COLUMN "user_id",
ADD COLUMN     "userId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "notification_settings_userId_key" ON "notification_settings"("userId");

-- AddForeignKey
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
