/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `RestaurantSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `RestaurantSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RestaurantSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RestaurantSettings" ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "themeColorSecondary" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "youtube" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantSettings_slug_key" ON "RestaurantSettings"("slug");

-- AddForeignKey
ALTER TABLE "RestaurantSettings" ADD CONSTRAINT "RestaurantSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
