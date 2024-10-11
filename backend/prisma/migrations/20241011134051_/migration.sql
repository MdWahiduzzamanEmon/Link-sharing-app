/*
  Warnings:

  - The primary key for the `SaveSocialLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[order]` on the table `SaveSocialLinks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SaveSocialLinks" DROP CONSTRAINT "SaveSocialLinks_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "SaveSocialLinks_order_key" ON "SaveSocialLinks"("order");
