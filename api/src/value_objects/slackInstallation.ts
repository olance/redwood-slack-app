import { Installation } from '@slack/oauth'

export class SlackInstallation {
  constructor(private installationData: Installation) {}

  get isEnterprise() {
    return this.installationData.isEnterpriseInstall
  }

  get enterpriseId() {
    return this.installationData.enterprise.id
  }

  get teamId() {
    return this.installationData.team.id
  }

  get slackOrgId() {
    return this.isEnterprise && this.enterpriseId
      ? this.enterpriseId
      : this.teamId
  }
}
