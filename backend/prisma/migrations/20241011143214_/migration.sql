/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `SaveSocialLinks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SaveSocialLinks_order_key" ON "SaveSocialLinks"("order");
