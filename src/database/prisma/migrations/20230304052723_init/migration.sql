/*
  Warnings:

  - You are about to drop the column `article_postion` on the `NewbieCorner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[article_position]` on the table `NewbieCorner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "NewbieCorner_article_postion_key";

-- AlterTable
ALTER TABLE "NewbieCorner" DROP COLUMN "article_postion",
ADD COLUMN     "article_position" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "NewbieCorner_article_position_key" ON "NewbieCorner"("article_position");
