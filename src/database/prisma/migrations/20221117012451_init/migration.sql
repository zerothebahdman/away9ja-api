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
    "isEmailVerified" BOOLEAN DEFAULT false,
    "emailVerifiedAt" TIMESTAMP(3),
    "emailVerificationToken" VARCHAR(255),
    "emailVerificationTokenExpiry" TIMESTAMP(3),
    "passwordResetToken" VARCHAR(255),
    "passwordResetTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

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
CREATE UNIQUE INDEX "Users_passwordResetToken_key" ON "Users"("passwordResetToken");
