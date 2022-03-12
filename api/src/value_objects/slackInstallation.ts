import { Installation } from '@slack/oauth'

export class SlackInstallation {
  constructor(private installationData: Installation) {}

  get rawData(): Installation {
    return this.installationData
  }

  get botToken(): string {
    return this.installationData.bot?.token
  }

  get botScopes(): string {
    return this.installationData.bot?.scopes.join(',')
  }

  get isEnterprise(): boolean {
    return !!this.installationData.isEnterpriseInstall
  }

  get enterpriseId() {
    return this.installationData.enterprise?.id
  }

  get teamId() {
    return this.installationData.team?.id
  }

  get userId() {
    return this.installationData.user.id
  }

  get slackOrgId() {
    return this.isEnterprise && this.enterpriseId
      ? this.enterpriseId
      : this.teamId
  }

  get organizationName() {
    return this.isEnterprise
      ? this.installationData.enterprise.name
      : this.installationData.team.name
  }
}
