import {
  Installation,
  InstallationQuery,
  InstallProvider,
} from '@slack/oauth'

import { AppInstallation } from 'src/models'
import { SlackInstallation } from '../value_objects/slackInstallation'

export const SlackInstaller = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,

  installationStore: {
    async storeInstallation<AuthVersion extends 'v1' | 'v2'>(
      installation: Installation<AuthVersion, boolean>
    ): Promise<void> {
      const slackInstallation = new SlackInstallation(installation)

      const appInstall = await AppInstallation.create({
        botScopes: slackInstallation.botScopes,
        botToken: slackInstallation.botToken,
        teamId: slackInstallation.teamId,
        isEnterprise: slackInstallation.isEnterprise,
        enterpriseId: slackInstallation.enterpriseId,
        slackOrgId: slackInstallation.slackOrgId,
        installationData: installation,
      })

      if (appInstall === false) {
        throw new Error('Failed saving Slack app installation')
      }
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
