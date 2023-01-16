/*
  Warnings:

  - Added the required column `amount` to the `marketPlace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post_Comments" DROP CONSTRAINT "Post_Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Comments" DROP CONSTRAINT "Post_Comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_user_id_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_category_id_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_user_id_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "isAnonymous" BOOLEAN DEFAULT false,
ADD COLUMN     "isApproved" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "marketPlace" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "parent_child_comments" ADD COLUMN     "child_market_place_comment_id" UUID,
ADD COLUMN     "parent_market_place_comment_id" UUID;

-- CreateTable
CREATE TABLE "marketPlace_Comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "body" VARCHAR(255) NOT NULL,
    "user_id" UUID,
    "marketPlaceId" UUID,
    "type" "CommentType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "marketPlace_Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post_Comments" ADD CONSTRAINT "Post_Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comments" ADD CONSTRAINT "Post_Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_parent_market_place_comment_id_fkey" FOREIGN KEY ("parent_market_place_comment_id") REFERENCES "marketPlace_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_child_market_place_comment_id_fkey" FOREIGN KEY ("child_market_place_comment_id") REFERENCES "marketPlace_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace_Comments" ADD CONSTRAINT "marketPlace_Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace_Comments" ADD CONSTRAINT "marketPlace_Comments_marketPlaceId_fkey" FOREIGN KEY ("marketPlaceId") REFERENCES "marketPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
