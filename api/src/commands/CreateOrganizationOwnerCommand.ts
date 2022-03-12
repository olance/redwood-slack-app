import {
  AppInstallation,
  Organization,
  OrgUsersMembership,
  User,
} from 'src/models'

import { OrgUserRole } from '@prisma/client'

import Command from './Command'
import { WebClient } from '@slack/web-api'
import { SlackUserProfile } from '../value_objects/slackUserProfile'

export default class CreateOrganizationOwnerCommand extends Command {
  constructor(
    private appInstallation: AppInstallation,
    private organization: Organization
  ) {
    super()
  }

  async execute(): Promise<User> {
    const userSlackId = this.appInstallation.slackInstallation.userId

    // We don't want to be upgrading an existing user's role for the org,
    // so we just return the existing one if it's there
    const existingUser = await User.first({
      slackId: userSlackId,
      slackOrgId: this.organization.slackOrgId,
    })

    if (existingUser) {
      return existingUser
    }

    // If no existing user found, create it and its membership to the org

    // First, get user profile information from Slack
    let userProfile: SlackUserProfile

    const slack = new WebClient(this.appInstallation.botToken)
    try {
      const result = await slack.users.profile.get({
        user: userSlackId,
      })

      if (result.ok) {
        userProfile = new SlackUserProfile(result.profile)
      } else {
        console.error(
          `Error fetching Slack user: ${result.error}`,
          result.response_metadata
        )
      }
    } catch (e) {
      console.error('Error fetching Slack user', e)
    }

    const user = await User.create({
      slackId: userSlackId,
      slackOrgId: this.organization.slackOrgId,

      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      fullName: userProfile?.fullName,
      email: userProfile?.email,
      title: userProfile?.title,
      profilePictureUrl: userProfile?.profilePictureUrl,
    })

    await OrgUsersMembership.create({
      organizationId: this.organization.id,
      userId: user.id,
      role: OrgUserRole.OWNER,
    })

    return user
  }
}
