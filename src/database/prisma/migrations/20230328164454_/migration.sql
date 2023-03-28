-- CreateEnum
CREATE TYPE "FlaggedStatus" AS ENUM ('pending', 'resolved', 'rejected');

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "isPostFlagged" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "parent_child_comments" ADD COLUMN     "userId" UUID;

-- CreateTable
CREATE TABLE "report_posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "post_id" UUID,
    "reason" VARCHAR(255),
    "description" VARCHAR,
    "status" "FlaggedStatus" DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "report_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "report_posts" ADD CONSTRAINT "report_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_posts" ADD CONSTRAINT "report_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
