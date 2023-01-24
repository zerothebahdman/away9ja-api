-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('image', 'text', 'text_image');

-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('mainComment', 'subComment');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('single', 'married', 'divorced', 'widowed');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('pending', 'verified');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "Role" DEFAULT 'user',
    "maritalStatus" "MaritalStatus",
    "businessName" VARCHAR(255),
    "address" VARCHAR(255) NOT NULL,
    "stateOfOrigin" VARCHAR(255) NOT NULL,
    "referralCode" VARCHAR(255),
    "inviteCode" VARCHAR(255),
    "status" "AccountStatus" DEFAULT 'pending',
    "is_email_verified" BOOLEAN DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "email_verification_token" VARCHAR(255),
    "email_verification_token_expiry" TIMESTAMP(3),
    "password_reset_token" VARCHAR(255),
    "password_reset_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "body" VARCHAR(1000),
    "user_id" UUID,
    "post_type" "PostType",
    "post_category_id" UUID,
    "images" TEXT[],
    "tags" TEXT[],
    "location" TEXT,
    "isApproved" BOOLEAN DEFAULT false,
    "isAnonymous" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "body" VARCHAR(255) NOT NULL,
    "user_id" UUID,
    "post_id" UUID,
    "type" "CommentType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Post_Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "post_comment_id" UUID,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_likes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "post_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "post_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent_child_comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parent_post_comment_id" UUID,
    "child_post_comment_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "parent_market_place_comment_id" UUID,
    "child_market_place_comment_id" UUID,

    CONSTRAINT "parent_child_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketPlaceCategories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "MarketPlaceCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketPlace" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "user_id" UUID,
    "marketplace_category_id" UUID,
    "description" VARCHAR(255),
    "photos" TEXT[],
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "marketPlace_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "description" VARCHAR(255),
    "user_id" UUID,
    "photo" VARCHAR(255),
    "date" VARCHAR(255),
    "time" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_referralCode_key" ON "Users"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_reset_token_key" ON "Users"("password_reset_token");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "post_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comments" ADD CONSTRAINT "Post_Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Comments" ADD CONSTRAINT "Post_Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_post_comment_id_fkey" FOREIGN KEY ("post_comment_id") REFERENCES "Post_Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_parent_post_comment_id_fkey" FOREIGN KEY ("parent_post_comment_id") REFERENCES "Post_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_child_post_comment_id_fkey" FOREIGN KEY ("child_post_comment_id") REFERENCES "Post_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_parent_market_place_comment_id_fkey" FOREIGN KEY ("parent_market_place_comment_id") REFERENCES "marketPlace_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_comments" ADD CONSTRAINT "parent_child_comments_child_market_place_comment_id_fkey" FOREIGN KEY ("child_market_place_comment_id") REFERENCES "marketPlace_Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_marketplace_category_id_fkey" FOREIGN KEY ("marketplace_category_id") REFERENCES "MarketPlaceCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace_Comments" ADD CONSTRAINT "marketPlace_Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace_Comments" ADD CONSTRAINT "marketPlace_Comments_marketPlaceId_fkey" FOREIGN KEY ("marketPlaceId") REFERENCES "marketPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
