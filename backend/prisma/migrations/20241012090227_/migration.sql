-- AlterTable
CREATE SEQUENCE savesociallinks_order_seq;
ALTER TABLE "SaveSocialLinks" ALTER COLUMN "order" SET DEFAULT nextval('savesociallinks_order_seq');
ALTER SEQUENCE savesociallinks_order_seq OWNED BY "SaveSocialLinks"."order";
