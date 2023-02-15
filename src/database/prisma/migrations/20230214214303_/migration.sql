-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'exclusive_user';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "invitedUsersCount" INTEGER DEFAULT 0,
ADD COLUMN     "pushNotificationId" VARCHAR(255);
