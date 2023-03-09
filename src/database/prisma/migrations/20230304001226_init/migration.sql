/*
  Warnings:

  - A unique constraint covering the columns `[article_postion]` on the table `NewbieCorner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NewbieCorner" ADD COLUMN     "article_postion" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "NewbieCorner_article_postion_key" ON "NewbieCorner"("article_postion");
