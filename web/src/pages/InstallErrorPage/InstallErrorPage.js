import { Link, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { ErrorCode } from '@slack/oauth/dist/errors'

const InstallErrorPage = () => {
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)
  const errorCode = searchParams.get('code') || ''

  let reason
  switch (errorCode) {
    case ErrorCode.InstallerInitializationError:
      reason =
        'something went wrong on our side when processing your request. We will fix this ASAP!'
      break
    case ErrorCode.AuthorizationError:
      reason = 'you have cancelled the app installation request. Try again?'
      break
    case ErrorCode.MissingStateError:
    case ErrorCode.MissingCodeError:
      reason =
        'we did not get all the expected data from Slack upon your return. Try again?'
      break
    case ErrorCode.UnknownError:
    default:
      reason = '... we do not know what happened ¯\\_(ツ)_/¯'
  }

  return (
    <>
      <MetaTags
        title="Installation Error"
        description="Slack application installation failed"
      />

      <h1>Installation error</h1>

      <p>
        An error has occurred during the installation of our Slack application:
      </p>

      <code>{errorCode}</code>

      <p>It usually means that {reason}</p>

      <Link to={routes.home()}>Back to homepage</Link>
    </>
  )
}

export default InstallErrorPage
