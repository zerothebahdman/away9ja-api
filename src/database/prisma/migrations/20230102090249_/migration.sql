/*
  Warnings:

  - The `post_type` column on the `Posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('post_image', 'post_text', 'post_text_image');

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "body" DROP NOT NULL,
DROP COLUMN "post_type",
ADD COLUMN     "post_type" "PostType";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "businessName" VARCHAR(255),
ALTER COLUMN "gender" DROP DEFAULT;
