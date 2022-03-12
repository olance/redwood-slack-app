import { UsersProfileGetResponse } from '@slack/web-api'

export class SlackUserProfile {
  constructor(private profileData: UsersProfileGetResponse['profile']) {}

  get firstName() {
    return this.profileData.first_name
  }

  get lastName() {
    return this.profileData.last_name
  }

  get fullName() {
    return (
      this.profileData.real_name ||
      this.profileData.real_name_normalized ||
      this.profileData.display_name ||
      this.profileData.display_name_normalized
    )
  }

  get email() {
    return this.profileData.email
  }

  get title() {
    return this.profileData.title
  }

  get profilePictureUrl() {
    return (
      this.profileData.image_512 ||
      this.profileData.image_1024 ||
      this.profileData.image_original
    )
  }
}
