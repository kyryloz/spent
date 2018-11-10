import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { accountsSelector } from '../../../../store/accounts/selectors'
import { categoriesSelector } from '../../../../store/categories/selectors'
import { Commands } from '../../../../store/commands/interface'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  command: Commands.ExpenseData
}

interface ConnectedProps {
  accountBalance: number
  accountName: string
  categoryExpenses: number
  categoryName: string
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
    accountBalance: accountsSelector.balance(
      ownProps.command.data.accountId,
      0,
      ownProps.command.timestamp
    )(state),
    categoryExpenses: categoriesSelector.expense(
      ownProps.command.data.categoryId,
      0,
      ownProps.command.timestamp
    )(state),
    accountName: accountsSelector.findById(ownProps.command.data.accountId)(state),
    categoryName: categoriesSelector.findById(ownProps.command.data.categoryId)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Expense')
)(View)
