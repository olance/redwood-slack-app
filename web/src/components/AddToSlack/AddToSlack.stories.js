import AddToSlack, {
  SlackButtonColorTheme,
  SlackButtonCorners,
  SlackButtonSize,
} from './AddToSlack'

export const defaultProps = () => {
  return <AddToSlack clientID="CLIENT_ID" />
}

export const smallButton = () => {
  return <AddToSlack clientID="CLIENT_ID" size={SlackButtonSize.Small} />
}

export const largeButton = () => {
  return <AddToSlack clientID="CLIENT_ID" size={SlackButtonSize.Large} />
}

export const defaultIconOnly = () => {
  return <AddToSlack clientID="CLIENT_ID" iconOnly={true} />
}

export const smallIconOnly = () => {
  return (
    <AddToSlack
      clientID="CLIENT_ID"
      size={SlackButtonSize.Small}
      iconOnly={true}
    />
  )
}

export const largeIconOnly = () => {
  return (
    <AddToSlack
      clientID="CLIENT_ID"
      size={SlackButtonSize.Large}
      iconOnly={true}
    />
  )
}

export const customLabel = () => {
  return <AddToSlack clientID="CLIENT_ID" label="Install on Slack" />
}

export const aubergineTheme = () => {
  return (
    <AddToSlack
      clientID="CLIENT_ID"
      colorTheme={SlackButtonColorTheme.Aubergine}
    />
  )
}

export const roundedCorners = () => {
  return (
    <AddToSlack clientID="CLIENT_ID" corners={SlackButtonCorners.Maximum} />
  )
}

export default { title: 'Components/AddToSlack' }
