/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ImageTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageTag_name_key" ON "ImageTag"("name");
