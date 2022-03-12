import { mockHttpEvent } from '@redwoodjs/testing/api'
import { ErrorCode } from '@slack/oauth/dist/errors'

import { handler } from './slackRedirect'

import { SlackInstaller } from 'src/lib/slackInstaller'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('Slack OAuth redirect function', () => {
  async function installRedirectTest(
    queryStringParameters,
    { errorCode = null, slackOrgId = null }
  ) {
    const httpEvent = mockHttpEvent({ queryStringParameters })

    const response = await handler(httpEvent, null)

    expect(response.statusCode).toEqual(302)
    expect(response.headers.Location).toMatch(
      errorCode
        ? `/install\/error?code=${errorCode}`
        : `/install/${slackOrgId}/finalize`
    )
  }

  describe('must handle errors correctly', () => {
    beforeEach(() => {
      // temporarily mute the `console.error` method to prevent tests "pollution"
      // with an expected error from Slack's OAuth callback handler
      console.error = jest.fn()
    })

    afterEach(() => {
      // If it's called more than once, we probably have something to check
      expect(console.error).toHaveBeenCalledTimes(1)
    })

    it('Should redirect to install error route on access denied', async () => {
      await installRedirectTest(
        {
          error: 'access_denied',
          state: '',
        },
        { errorCode: ErrorCode.AuthorizationError }
      )
    })

    it('Should redirect to install error route on missing state', async () => {
      await installRedirectTest(
        {
          code: 'some_code',
        },
        { errorCode: ErrorCode.MissingStateError }
      )
    })

    it('Should redirect to install error route on missing code', async () => {
      await installRedirectTest(
        {
          state: '',
        },
        { errorCode: ErrorCode.MissingCodeError }
      )
    })

    it('Should redirect to install error route on malformed JWT token', async () => {
      await installRedirectTest(
        {
          code: 'not a JWT token',
          state: 'state',
        },
        { errorCode: 'JsonWebTokenError' }
      )
    })
  })

  it('Should redirect to install finalization route on completed flow', async () => {
    SlackInstaller.handleCallback = jest.fn((_req, _res, options) => {
      options.success({
        team: { id: 'TEAM_ID' },
        isEnterpriseInstall: false,
      })
    })
    await installRedirectTest(
      { code: 'some_code', state: '0' },
      { slackOrgId: 'TEAM_ID' }
    )

    SlackInstaller.handleCallback = jest.fn((_req, _res, options) => {
      options.success({
        team: { id: 'TEAM_ID' },
        enterprise: { id: 'ENTERPRISE_ID' },
        isEnterpriseInstall: true,
      })
    })
    await installRedirectTest(
      { code: 'some_code', state: '0' },
      { slackOrgId: 'ENTERPRISE_ID' }
    )
  })
})
