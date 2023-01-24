-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "postCategoriesId" UUID;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_postCategoriesId_fkey" FOREIGN KEY ("postCategoriesId") REFERENCES "post_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
