import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { App } from '../../store/interface'
import { MainPageView } from './MainPageView'
import { styles } from './styles'

interface OutterProps {}

interface ConnectedProps {}

export interface StyledComponentProps {
  classes: WithStyles<typeof styles>
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const MainPage = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withConnectedProps<ConnectedProps>(() => ({})),
  pure,
  setDisplayName('MainPage')
)(MainPageView)
