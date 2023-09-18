-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "paginationLimit" INTEGER NOT NULL,
    "defaultPosterPostsImg" TEXT NOT NULL,
    "defaultPosterPostsPlaceholderImg" TEXT NOT NULL,
    "defaultCoverPostsImg" TEXT NOT NULL,
    "defaultCoverPostsPlaceholderImg" TEXT NOT NULL,
    "defaultAuthorImg" TEXT NOT NULL,
    "logoImg" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "siteUrl" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
