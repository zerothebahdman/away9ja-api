/*
  Warnings:

  - You are about to drop the column `referalCode` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('pending', 'verified');

-- DropIndex
DROP INDEX "Users_referalCode_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "referalCode",
ADD COLUMN     "referralCode" VARCHAR(255),
ADD COLUMN     "status" "AccountStatus" DEFAULT 'pending';

-- CreateTable
CREATE TABLE "refered_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "referal_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "refered_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_referralCode_key" ON "Users"("referralCode");

-- AddForeignKey
ALTER TABLE "refered_users" ADD CONSTRAINT "refered_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refered_users" ADD CONSTRAINT "refered_users_referal_id_fkey" FOREIGN KEY ("referal_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
