-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'male',
    "address" VARCHAR(255) NOT NULL,
    "stateOfOrigin" VARCHAR(255) NOT NULL,
    "referalCode" VARCHAR(255),
    "inviteCode" VARCHAR(255),
    "is_email_verified" BOOLEAN DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "email_verification_token" VARCHAR(255),
    "email_verification_tokenExpiry" TIMESTAMP(3),
    "password_reset_token" VARCHAR(255),
    "password_reset_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_referalCode_key" ON "Users"("referalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Users_inviteCode_key" ON "Users"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_reset_token_key" ON "Users"("password_reset_token");
