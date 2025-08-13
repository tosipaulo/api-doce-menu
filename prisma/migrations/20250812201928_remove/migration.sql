/*
  Warnings:

  - You are about to drop the column `facebook` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RestaurantSettings` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `RestaurantSettings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RestaurantSettings" DROP CONSTRAINT "RestaurantSettings_userId_fkey";

-- DropIndex
DROP INDEX "RestaurantSettings_slug_key";

-- AlterTable
ALTER TABLE "RestaurantSettings" DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "slug",
DROP COLUMN "tiktok",
DROP COLUMN "twitter",
DROP COLUMN "userId",
DROP COLUMN "youtube";
