/*
  Warnings:

  - The primary key for the `AppInstallation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `AppInstallation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppInstallation" DROP CONSTRAINT "AppInstallation_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AppInstallation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AppInstallation_id_seq";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "slackOrgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgUsersMembership" (
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgUsersMembership_pkey" PRIMARY KEY ("organizationId","userId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "slackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "title" TEXT,
    "profilePictureUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slackOrgId_key" ON "Organization"("slackOrgId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_slackOrgId_fkey" FOREIGN KEY ("slackOrgId") REFERENCES "AppInstallation"("slackOrgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUsersMembership" ADD CONSTRAINT "OrgUsersMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgUsersMembership" ADD CONSTRAINT "OrgUsersMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
