/*
  Warnings:

  - You are about to drop the column `email_verification_tokenExpiry` on the `Users` table. All the data in the column will be lost.
  - Added the required column `post_type` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "post_type" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email_verification_tokenExpiry",
ADD COLUMN     "email_verification_token_expiry" TIMESTAMP(3);
