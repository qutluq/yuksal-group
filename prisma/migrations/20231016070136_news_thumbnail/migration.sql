-- CreateTable
CREATE TABLE "NewsThumbnail" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "NewsThumbnail_pkey" PRIMARY KEY ("id")
);
