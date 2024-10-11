/*
  Warnings:

  - Added the required column `order` to the `SaveSocialLinks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaveSocialLinks" ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
