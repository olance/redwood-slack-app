import { MetaTags } from '@redwoodjs/web'
import AddToSlackCell from 'src/components/AddToSlackCell/AddToSlackCell'

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

      <AddToSlackCell />
    </>
  )
}

export default HomePage
