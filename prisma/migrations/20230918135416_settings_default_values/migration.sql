-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "paginationLimit" SET DEFAULT 10,
ALTER COLUMN "defaultPosterPostsImg" SET DEFAULT '',
ALTER COLUMN "defaultPosterPostsPlaceholderImg" SET DEFAULT '',
ALTER COLUMN "defaultCoverPostsImg" SET DEFAULT '',
ALTER COLUMN "defaultCoverPostsPlaceholderImg" SET DEFAULT '',
ALTER COLUMN "logoImg" SET DEFAULT '',
ALTER COLUMN "siteName" SET DEFAULT '',
ALTER COLUMN "siteDescription" SET DEFAULT '',
ALTER COLUMN "siteUrl" SET DEFAULT '';
DROP SEQUENCE "Settings_id_seq";
