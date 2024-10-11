/*
  Warnings:

  - The `profile_image` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profile_image",
ADD COLUMN     "profile_image" JSONB DEFAULT '{}';
