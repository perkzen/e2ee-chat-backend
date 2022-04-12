/*
  Warnings:

  - You are about to drop the column `keyPair` on the `conversations` table. All the data in the column will be lost.
  - Added the required column `computedSecret` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "keyPair",
ADD COLUMN     "computedSecret" TEXT NOT NULL;
