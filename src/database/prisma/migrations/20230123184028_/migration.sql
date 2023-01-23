-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" DEFAULT 'user';
