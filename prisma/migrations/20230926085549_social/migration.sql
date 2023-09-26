/*
  Warnings:

  - You are about to drop the column `logoImg` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "logoImg",
ADD COLUMN     "facebookLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "instagramLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tiktokLink" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "youtubeLink" TEXT NOT NULL DEFAULT '';
