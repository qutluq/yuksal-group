/*
  Warnings:

  - You are about to drop the column `featured_image` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "featured_image",
ADD COLUMN     "featuredImage" TEXT;
