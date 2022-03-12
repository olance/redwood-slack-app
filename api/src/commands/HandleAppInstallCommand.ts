import Command from './Command'
import { Installation } from '@slack/oauth'
import { SlackInstallation } from '../value_objects/slackInstallation'
import CreateAppInstallCommand from './CreateAppInstallCommand'
import CreateAppOrganizationCommand from './CreateAppOrganizationCommand'
import CreateOrganizationOwnerCommand from './CreateOrganizationOwnerCommand'

export default class HandleAppInstallCommand<
  AuthVersion extends 'v1' | 'v2'
> extends Command {
  private slackInstallation: SlackInstallation

  constructor(installationData: Installation<AuthVersion, boolean>) {
    super()

    this.slackInstallation = new SlackInstallation(installationData)
  }

  async execute() {
    const createAppInstall = new CreateAppInstallCommand(this.slackInstallation)
    const appInstall = await createAppInstall.execute()

    const createAppOrganization = new CreateAppOrganizationCommand(appInstall)
    const appOrg = await createAppOrganization.execute()

    const createOrganizationOwner = new CreateOrganizationOwnerCommand(
      appInstall,
      appOrg
    )
    await createOrganizationOwner.execute()
  }
}
