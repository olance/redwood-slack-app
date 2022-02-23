import { render, screen } from '@redwoodjs/testing/web'

import AddToSlack from './AddToSlack'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

function urlParams(link) {
  const paramsStr = decodeURIComponent(link.getAttribute('href').split('?')[1])
  return new URLSearchParams(paramsStr)
}

describe('AddToSlack', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddToSlack clientID="CLIENT_ID" />)
    }).not.toThrow()

    expect(screen.getByText('Add to Slack')).toBeInTheDocument()
  })

  it('outputs empty scope when no bot scopes provided', () => {
    render(<AddToSlack clientID="CLIENT_ID" />)

    const params = urlParams(screen.getByText('Add to Slack'))

    expect(params.get('scope')).toBeFalsy()
  })

  it('outputs provided bot scopes as scope', () => {
    render(
      <AddToSlack
        clientID="CLIENT_ID"
        botScopes={['chat:write', 'user:read.email']}
      />
    )

    const params = urlParams(screen.getByText('Add to Slack'))

    expect(params.get('scope')).toEqual('chat:write,user:read.email')
  })

  it('outputs empty user_scope when no user scopes provided', () => {
    render(<AddToSlack clientID="CLIENT_ID" />)

    const params = urlParams(screen.getByText('Add to Slack'))
    expect(params.get('user_scope')).toBeFalsy()
  })

  it('outputs provided user scopes as user_scope', () => {
    render(
      <AddToSlack
        clientID="CLIENT_ID"
        userScopes={['chat:write', 'user:read.email']}
      />
    )

    const params = urlParams(screen.getByText('Add to Slack'))
    expect(params.get('user_scope')).toEqual('chat:write,user:read.email')
  })

  it('outputs empty redirect_uro when none is provided', () => {
    render(<AddToSlack clientID="CLIENT_ID" />)

    const params = urlParams(screen.getByText('Add to Slack'))
    expect(params.get('redirect_uri')).toBeFalsy()
  })

  it('outputs provided redirect_uri', () => {
    const redirectUri = 'https://myapp.com/slack/oauth/redirect'

    render(<AddToSlack clientID="CLIENT_ID" redirectUri={redirectUri} />)

    const params = urlParams(screen.getByText('Add to Slack'))
    expect(params.get('redirect_uri')).toEqual(redirectUri)
  })

  it('outputs provided client ID', () => {
    const clientId = 'MY_CLIENT_ID'

    render(<AddToSlack clientID={clientId} />)

    const params = urlParams(screen.getByText('Add to Slack'))
    expect(params.get('client_id')).toEqual(clientId)
  })

  it('displays provided label', () => {
    const label = 'Custom button label'

    render(<AddToSlack clientID="CLIENT_ID" label={label} />)

    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('overrides the link URL & ignores other URL params when `fullUrl` is provided', () => {
    const url = 'https://redwoodjs.com'

    render(<AddToSlack fullUrl={url} />)

    expect(screen.getByText('Add to Slack')).toHaveAttribute('href', url)
  })
})
