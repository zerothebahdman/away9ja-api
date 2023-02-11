/*
  Warnings:

  - You are about to drop the column `post_comment_id` on the `post_categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_categories" DROP CONSTRAINT "post_categories_post_comment_id_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "avatar" VARCHAR(255),
ADD COLUMN     "dob" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "marketPlace" ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post_categories" DROP COLUMN "post_comment_id";
