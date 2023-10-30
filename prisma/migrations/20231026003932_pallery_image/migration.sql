-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnImages" (
    "imageId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnImages_pkey" PRIMARY KEY ("imageId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagsOnImages" ADD CONSTRAINT "TagsOnImages_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "GalleryImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnImages" ADD CONSTRAINT "TagsOnImages_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ImageTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
