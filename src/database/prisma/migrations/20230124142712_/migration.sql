/*
  Warnings:

  - You are about to drop the column `postCategoriesId` on the `Posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_postCategoriesId_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "postCategoriesId",
ADD COLUMN     "post_category_id" UUID;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "post_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
