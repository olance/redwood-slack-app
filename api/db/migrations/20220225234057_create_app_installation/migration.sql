-- CreateTable
CREATE TABLE "AppInstallation" (
    "id" SERIAL NOT NULL,
    "botScopes" TEXT NOT NULL,
    "botToken" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "isEnterprise" BOOLEAN NOT NULL,
    "enterpriseId" TEXT,
    "slackOrgId" TEXT NOT NULL,
    "installationData" JSONB NOT NULL,

    CONSTRAINT "AppInstallation_pkey" PRIMARY KEY ("id")
);
