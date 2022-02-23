import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Welcome to my Slack application!</h1>

      <p>
        To use my awesome Slack app in your workspace, you must install it
        first.
        <br />
        Click the button below to get started :)
      </p>

      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </>
  )
}

export default HomePage
