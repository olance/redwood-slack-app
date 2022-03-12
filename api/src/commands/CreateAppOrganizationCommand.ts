import { AppInstallation, Organization } from 'src/models'
import Command from './Command'

export default class CreateAppOrganizationCommand extends Command {
  constructor(private appInstallation: AppInstallation) {
    super()
  }

  async execute(): Promise<Organization> {
    const slackOrgId = this.appInstallation.slackOrgId

    return await Organization.upsert(
      {
        slackOrgId,
        name: this.appInstallation.slackInstallation.organizationName,
      },
      { slackOrgId }
    )
  }
}
