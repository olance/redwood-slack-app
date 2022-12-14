import { render } from '@redwoodjs/testing/web'

import InstallSignInPage from './InstallSignInPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InstallSignInPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InstallSignInPage />)
    }).not.toThrow()
  })
})
