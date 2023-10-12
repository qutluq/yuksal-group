-- CreateTable
CREATE TABLE "HomeGalleryImage" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "HomeGalleryImage_pkey" PRIMARY KEY ("id")
);
