import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  rawCommand: string
  timestamp: number
}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const CommandWrapper = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('CommandWrapper')
)(View)
