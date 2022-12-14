import PropTypes from 'prop-types'

function serializeList(list: string[]) {
  return encodeURIComponent(list.join(','))
}

export enum SlackButtonSize {
  Small,
  Default,
  Large,
}

export enum SlackButtonColorTheme {
  Light,
  Aubergine,
}

export enum SlackButtonCorners {
  Default,
  Maximum,
}

const BUTTON_SIZES = {
  0: {
    [SlackButtonSize.Small]: {
      height: '44px',
      width: '204px',
    },
    [SlackButtonSize.Default]: {
      height: '48px',
      width: '236px',
    },
    [SlackButtonSize.Large]: {
      height: '56px',
      width: '276px',
    },
  },
  1: {
    [SlackButtonSize.Small]: {
      height: '36px',
      width: '36px',
    },
    [SlackButtonSize.Default]: {
      height: '48px',
      width: '48px',
    },
    [SlackButtonSize.Large]: {
      height: '56px',
      width: '56px',
    },
  },
}
const BUTTON_COLORS = {
  [SlackButtonColorTheme.Light]: {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
  },
  [SlackButtonColorTheme.Aubergine]: {
    color: '#fff',
    backgroundColor: '#4A154B',
    border: '0',
  },
}
const BUTTON_CORNERS = {
  [SlackButtonCorners.Default]: {
    borderRadius: '4px',
  },

  [SlackButtonCorners.Maximum]: {
    borderRadius: '48px',
  },
}

const ICON_SIZES = {
  0: {
    [SlackButtonSize.Small]: {
      height: '16px',
      width: '16px',
      marginRight: '12px',
    },
    [SlackButtonSize.Default]: {
      height: '20px',
      width: '20px',
      marginRight: '12px',
    },
    [SlackButtonSize.Large]: {
      height: '24px',
      width: '24px',
      marginRight: '12px',
    },
  },
  1: {
    [SlackButtonSize.Small]: {
      height: '18px',
      width: '18px',
      marginRight: '0',
    },
    [SlackButtonSize.Default]: {
      height: '24px',
      width: '24px',
      marginRight: '0',
    },
    [SlackButtonSize.Large]: {
      height: '28px',
      width: '28px',
      marginRight: '0',
    },
  },
}

const AddToSlack = ({
  clientID,
  fullUrl = null,
  botScopes = [],
  userScopes = [],
  redirectUri = '',
  size = SlackButtonSize.Default,
  iconOnly = false,
  label = 'Add to Slack',
  colorTheme = SlackButtonColorTheme.Light,
  corners = SlackButtonCorners.Default,
}) => {
  const buttonStyles = {
    ...{
      alignItems: 'center',
      display: 'inline-flex',
      fontFamily: 'Lato, sans-serif',
      fontSize: '16px',
      fontWeight: '600',
      justifyContent: 'center',
      textDecoration: 'none',
    },
    ...BUTTON_SIZES[Number(iconOnly)][size],
    ...BUTTON_COLORS[colorTheme],
    ...BUTTON_CORNERS[corners],
  }

  const iconStyles = ICON_SIZES[Number(iconOnly)][size]

  const url =
    fullUrl ||
    `https://slack.com/oauth/v2/authorize?scope=${serializeList(
      botScopes
    )}&user_scope=${serializeList(
      userScopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientID}`

  if (iconOnly) {
    label = ''
  }

  return (
    <a href={url} style={buttonStyles}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyles}
        viewBox="0 0 122.8 122.8"
      >
        <path
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
          fill="#e01e5a"
        />
        <path
          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
          fill="#36c5f0"
        />
        <path
          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
          fill="#2eb67d"
        />
        <path
          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
          fill="#ecb22e"
        />
      </svg>
      {label}
    </a>
  )
}

AddToSlack.propTypes = {
  clientID: (props, propName) => {
    if (!props.fullUrl && !props[propName]) {
      return new Error(
        `${propName} is required when \`fullUrl\` is not provided`
      )
    }
  },
  fullUrl: PropTypes.string,
  redirectUri: PropTypes.string,
  userScopes: PropTypes.arrayOf(PropTypes.string),
  botScopes: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(Object.values(SlackButtonSize)),
  iconOnly: PropTypes.bool,
  label: PropTypes.string,
  colorTheme: PropTypes.oneOf(Object.values(SlackButtonColorTheme)),
  corners: PropTypes.oneOf(Object.values(SlackButtonCorners)),
}

export default AddToSlack
