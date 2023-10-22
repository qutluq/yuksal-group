/*
  Warnings:

  - You are about to drop the `AboutMain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AboutMain";

-- CreateTable
CREATE TABLE "AboutMainImage" (
    "id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AboutMainImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutMainTranslated" (
    "language" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "AboutMainTranslated_pkey" PRIMARY KEY ("language")
);

-- AddForeignKey
ALTER TABLE "AboutMainTranslated" ADD CONSTRAINT "AboutMainTranslated_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "AboutMainImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
