-- AlterTable
ALTER TABLE "SaveSocialLinks" ALTER COLUMN "order" SET DEFAULT 1,
ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "SaveSocialLinks_order_seq";
