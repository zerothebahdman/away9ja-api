/*
  Warnings:

  - You are about to drop the column `newbieTag_id` on the `NewbieCorner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NewbieCorner" DROP CONSTRAINT "NewbieCorner_newbieTag_id_fkey";

-- AlterTable
ALTER TABLE "NewbieCorner" DROP COLUMN "newbieTag_id";

-- CreateTable
CREATE TABLE "_NewbieCornerToNewbieTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NewbieCornerToNewbieTag_AB_unique" ON "_NewbieCornerToNewbieTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NewbieCornerToNewbieTag_B_index" ON "_NewbieCornerToNewbieTag"("B");

-- AddForeignKey
ALTER TABLE "_NewbieCornerToNewbieTag" ADD CONSTRAINT "_NewbieCornerToNewbieTag_A_fkey" FOREIGN KEY ("A") REFERENCES "NewbieCorner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewbieCornerToNewbieTag" ADD CONSTRAINT "_NewbieCornerToNewbieTag_B_fkey" FOREIGN KEY ("B") REFERENCES "newbieTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
