import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InstallSignInPage = ({ slackOrgId }) => {
  return (
    <>
      <MetaTags title="InstallSignIn" description="InstallSignIn page" />

      <h1>Let's log in!</h1>
      <p>
        We have successfully registered our awesome Slack app with your Slack
        workspace.
      </p>
      <p>
        Unfortunately, Slack does not log you in with us at the same time 🥲
        <br />
        Click on the button below to login and
      </p>
    </>
  )
}

export default InstallSignInPage
