import { db } from 'src/lib/db'
import { decrypt } from 'src/lib/encryption/encryption'
import { AppInstallation } from 'src/models'

describe('AppInstallation model', () => {
  it('Should save encrypted bot token to DB', async () => {
    const botToken = 'A-f4kE-B0t-70k3n'

    const appInstall = await AppInstallation.create({
      botScopes: 'users:read,users.profile:read',
      botToken,
      teamId: 'TEAM_ID',
      isEnterprise: false,
      enterpriseId: null,
      slackOrgId: 'TEAM_ID',
      installationData: {
        bot: {
          token: botToken,
        },
        team: {
          id: 'TEAM_ID',
        },
      },
    })

    expect(appInstall).not.toBeFalsy()

    // Read bot token directly from DB record to check it's properly encrypted
    const dbAppInstall = await db.appInstallation.findFirst()
    expect(decrypt(dbAppInstall.botToken)).toEqual(botToken)
    expect(decrypt(dbAppInstall.installationData.bot.token)).toEqual(botToken)
  })

  it('Should encrypt data when using property setter', async () => {
    const botToken = 'A-f4kE-B0t-70k3n'

    const appInstall = AppInstallation.build({
      botScopes: 'users:read,users.profile:read',
      botToken: null,
      teamId: 'TEAM_ID',
      isEnterprise: false,
      enterpriseId: null,
      slackOrgId: 'TEAM_ID',
      installationData: null,
    })

    const installationData = {
      bot: {
        token: botToken,
      },
      team: {
        id: 'TEAM_ID',
      },
    }

    appInstall.botToken = botToken
    appInstall.installationData = installationData

    await appInstall.save({ throw: true })

    // Read bot token directly from DB record to check it's properly encrypted
    const dbAppInstall = await db.appInstallation.findFirst()
    expect(decrypt(dbAppInstall.botToken)).toEqual(botToken)
    expect(decrypt(dbAppInstall.installationData.bot.token)).toEqual(botToken)
  })

  scenario(
    'encryptedBotToken',
    'Should decrypt bot token from DB',
    async (scenarioData) => {
      const appInstall = await AppInstallation.find(
        scenarioData.appInstallation.encrypted.id
      )

      expect(appInstall.botToken).toEqual(
        decrypt(scenarioData.appInstallation.encrypted.botToken)
      )

      expect(appInstall.installationData.bot.token).toEqual(
        decrypt(
          scenarioData.appInstallation.encrypted.installationData.bot.token
        )
      )
    }
  )
})
