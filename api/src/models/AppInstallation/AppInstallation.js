import { SlackInstallation } from 'src/value_objects/slackInstallation'

import { BaseModel } from 'src/models/BaseModel'
import EncryptionMixin from 'src/models/mixins/EncryptionMixin'

export default class AppInstallation extends EncryptionMixin(
  BaseModel,
  'botToken',
  'installationData.bot.token'
) {
  static async upsertFromSlackInstallation(slackInstallation) {
    return await this.upsert(
      {
        botScopes: slackInstallation.botScopes,
        botToken: slackInstallation.botToken,
        teamId: slackInstallation.teamId,
        isEnterprise: slackInstallation.isEnterprise,
        enterpriseId: slackInstallation.enterpriseId,
        slackOrgId: slackInstallation.slackOrgId,
        installationData: slackInstallation.rawData,
      },
      { slackOrgId: slackInstallation.slackOrgId }
    )
  }

  get slackInstallation() {
    return new SlackInstallation(this.installationData)
  }
}
