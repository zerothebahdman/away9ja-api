/*
  Warnings:

  - Made the column `amount` on table `marketPlace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "marketPlace" ALTER COLUMN "amount" SET NOT NULL;
