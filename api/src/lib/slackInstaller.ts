import { Installation, InstallationQuery, InstallProvider } from '@slack/oauth'

import { AppInstallation } from 'src/models'
import HandleAppInstallCommand from '../commands/HandleAppInstallCommand'

export const SlackInstaller = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,

  installationStore: {
    async storeInstallation<AuthVersion extends 'v1' | 'v2'>(
      installationData: Installation<AuthVersion, boolean>
    ): Promise<void> {
      const installationHandler = new HandleAppInstallCommand(installationData)
      await installationHandler.execute()
    },

    async fetchInstallation(
      query: InstallationQuery<boolean>
    ): Promise<Installation<'v1' | 'v2', boolean>> {
      const appInstall = await AppInstallation.first(
        {
          slackOrgId: query.isEnterpriseInstall
            ? query.enterpriseId
            : query.teamId,
        },
        {
          orderBy: { createdAt: 'desc' },
        }
      )

      return appInstall.installationData as Installation
    },
  },
})
