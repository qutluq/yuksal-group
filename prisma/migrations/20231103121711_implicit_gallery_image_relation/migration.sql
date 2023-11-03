/*
  Warnings:

  - You are about to drop the `TagsOnImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnImages" DROP CONSTRAINT "TagsOnImages_imageId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnImages" DROP CONSTRAINT "TagsOnImages_tagId_fkey";

-- DropTable
DROP TABLE "TagsOnImages";

-- CreateTable
CREATE TABLE "_GalleryImageToImageTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GalleryImageToImageTag_AB_unique" ON "_GalleryImageToImageTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GalleryImageToImageTag_B_index" ON "_GalleryImageToImageTag"("B");

-- AddForeignKey
ALTER TABLE "_GalleryImageToImageTag" ADD CONSTRAINT "_GalleryImageToImageTag_A_fkey" FOREIGN KEY ("A") REFERENCES "GalleryImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GalleryImageToImageTag" ADD CONSTRAINT "_GalleryImageToImageTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ImageTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
