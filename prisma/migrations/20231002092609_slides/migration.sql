-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "homepageCarouselSlideId" INTEGER;

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "articleSlug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_homepageCarouselSlideId_fkey" FOREIGN KEY ("homepageCarouselSlideId") REFERENCES "Slide"("id") ON DELETE SET NULL ON UPDATE CASCADE;
