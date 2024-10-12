/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `SaveSocialLinks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SaveSocialLinks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "SaveSocialLinks" DROP CONSTRAINT "SaveSocialLinks_userEmail_fkey";

-- DropIndex
DROP INDEX "Profile_userEmail_key";

-- DropIndex
DROP INDEX "SaveSocialLinks_userEmail_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SaveSocialLinks" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveSocialLinks" ADD CONSTRAINT "SaveSocialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
