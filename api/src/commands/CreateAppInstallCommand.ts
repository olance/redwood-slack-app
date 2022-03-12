import Command from './Command'
import { SlackInstallation } from 'src/value_objects/slackInstallation'
import { AppInstallation } from 'src/models'

export default class CreateAppInstallCommand extends Command {
  constructor(private slackInstallation: SlackInstallation) {
    super()
  }

  async execute(): Promise<AppInstallation> {
    const appInstall = await AppInstallation.upsertFromSlackInstallation(
      this.slackInstallation
    )

    if (appInstall === false) {
      throw new Error('Failed saving Slack app installation')
    }

    return appInstall
  }
}
