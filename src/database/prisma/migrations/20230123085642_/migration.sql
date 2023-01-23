/*
  Warnings:

  - You are about to drop the `refered_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refered_users" DROP CONSTRAINT "refered_users_referrer_id_fkey";

-- DropForeignKey
ALTER TABLE "refered_users" DROP CONSTRAINT "refered_users_user_id_fkey";

-- DropIndex
DROP INDEX "Users_inviteCode_key";

-- DropTable
DROP TABLE "refered_users";
