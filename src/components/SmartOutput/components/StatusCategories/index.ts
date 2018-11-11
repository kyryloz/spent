import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { categoriesSelector } from 'src/store/categories/selectors'
import { Commands } from 'src/store/commands/interface'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  command: Commands.StatusData
}

interface ConnectedProps {
  categories: {
    [name: string]: number
  }
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const StatusCategories = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    categories: categoriesSelector.expenses(0, ownProps.command.timestamp)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('StatusCategories')
)(View)
