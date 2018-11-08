import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { Commands } from '../../../../store/commands/interface'
import { commandsSelector } from '../../../../store/commands/selectors'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'
import { accountsSelector } from 'src/store/accounts/selectors';
import { categoriesSelector } from 'src/store/categories/selectors';

interface OutterProps {
  command: Commands.ExpenseData,
}

interface ConnectedProps {
  accountBalance: number
  accountName: string,
  categoryName: string,
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const Expense = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    accountBalance: commandsSelector.balance(ownProps.command.data.accountId)(state),
    accountName: accountsSelector.findById(ownProps.command.data.accountId)(state),
    categoryName: categoriesSelector.findById(ownProps.command.data.categoryId)(state)
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Expense')
)(View)
