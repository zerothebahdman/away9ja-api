/*
  Warnings:

  - You are about to drop the column `referal_id` on the `refered_users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "refered_users" DROP CONSTRAINT "refered_users_referal_id_fkey";

-- AlterTable
ALTER TABLE "refered_users" DROP COLUMN "referal_id",
ADD COLUMN     "referrer_id" UUID;

-- AddForeignKey
ALTER TABLE "refered_users" ADD CONSTRAINT "refered_users_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
