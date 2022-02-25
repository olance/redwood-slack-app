import { ErrorCode } from '@slack/oauth/dist/errors'
import { logger } from 'src/lib/logger'
import { SlackInstaller } from 'src/lib/slack'
import { SlackInstallation } from 'src/value_objects/slackInstallation'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import("aws-lambda").APIGatewayEvent } APIGatewayEvent
 * @typedef { import("aws-lambda").Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event) => {
  logger.info('Invoked slackRedirect function')

  const params = []
  for (let param in event.queryStringParameters) {
    params.push(`${param}=${event.queryStringParameters[param]}`)
  }

  const url = `https://${event.headers.host}${event.path}?${params.join('&')}`

  return new Promise((resolve) => {
    const callbackOptions = {
      success: (installation) => {
        const slackInstall = new SlackInstallation(installation)

        resolve({
          statusCode: 302,
          headers: {
            Location: `/install/${slackInstall.slackOrgId}/finalize`,
          },
        })
      },
      failure: (error) => {
        const errorCode = error.code || error.name || ErrorCode.UnknownError

        resolve({
          statusCode: 302,
          headers: {
            Location: `/install/error?code=${errorCode}`,
          },
        })
      },
    }

    SlackInstaller.handleCallback(
      {
        url,
        headers: event.headers,
      },
      null,
      callbackOptions
    )
  })
}
