export const schema = gql`
  type Query {
    getInstallUrl: String! @skipAuth
  }
`
