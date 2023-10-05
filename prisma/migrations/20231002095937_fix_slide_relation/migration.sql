/*
  Warnings:

  - You are about to drop the column `homepageCarouselSlideId` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `settingId` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_homepageCarouselSlideId_fkey";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "homepageCarouselSlideId";

-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "settingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
