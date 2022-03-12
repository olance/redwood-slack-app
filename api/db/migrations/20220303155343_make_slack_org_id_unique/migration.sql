/*
  Warnings:

  - A unique constraint covering the columns `[slackOrgId]` on the table `AppInstallation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppInstallation_slackOrgId_key" ON "AppInstallation"("slackOrgId");
