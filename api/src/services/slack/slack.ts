import { SlackInstaller } from 'src/lib/slackInstaller'

export async function getInstallUrl(): Promise<string> {
  return SlackInstaller.generateInstallUrl({
    scopes: process.env.SLACK_OAUTH_SCOPES,
    redirectUri: `${process.env.API_URL}/slackRedirect`,
  })
}
