/*
  Warnings:

  - You are about to drop the column `locked` on the `P2PTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "P2PTransaction" DROP COLUMN "locked",
ADD COLUMN     "toUserName" TEXT NOT NULL DEFAULT 'Anonymus';
