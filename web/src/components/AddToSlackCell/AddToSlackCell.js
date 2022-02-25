import AddToSlack from 'src/components/AddToSlack/AddToSlack'

export const QUERY = gql`
  query GetSlackInstallUrl {
    installUrl: getInstallUrl
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ installUrl }) => {
  return <AddToSlack fullUrl={installUrl} />
}
