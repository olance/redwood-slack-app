/*
  Warnings:

  - A unique constraint covering the columns `[slackId,slackOrgId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slackOrgId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrgUserRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "OrgUsersMembership" ADD COLUMN     "role" "OrgUserRole" NOT NULL DEFAULT E'MEMBER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slackOrgId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_slackId_slackOrgId_key" ON "User"("slackId", "slackOrgId");
