import { render } from '@redwoodjs/testing/web'

import InstallErrorPage from './InstallErrorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InstallErrorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InstallErrorPage />)
    }).not.toThrow()
  })
})
