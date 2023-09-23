/*
  Warnings:

  - You are about to drop the column `defaultAuthorImg` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "defaultAuthorImg";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
