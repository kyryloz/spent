import { Typography, Theme, createStyles } from '@material-ui/core'
import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { accountsSelector } from '../../store/accounts/selectors'
import { categoriesSelector } from '../../store/categories/selectors'
import { Commands } from '../../store/commands/interface'
import { App } from '../../store/interface'

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

type ViewProps = OutterProps & InnerProps & HandlerProps

const styles = (theme: Theme) =>
  createStyles({
    body: {
      border: `1px solid ${theme.colors.expense}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    bodyTitle: {
      color: theme.colors.expense,
    },
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
    category: {
      color: theme.colors.category,
    },
    line: {
      borderTop: `1px solid ${theme.colors.expense}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
  })

export const View: React.SFC<ViewProps> = ({
  command,
  accountBalance,
  accountName,
  categoryExpenses,
  categoryName,
  classes,
}) => (
  <div className={classes.body}>
    <Typography className={classes.amount}>
      -{command.data.amount} USD → <span className={classes.category}>{categoryName}</span>
    </Typography>
    <div className={classes.line} />
    <Typography className={classes.amount}>
      <span className={classes.account}>{accountName}</span> = {accountBalance} USD
    </Typography>
    <Typography className={classes.amount}>
      Spent on <span className={classes.category}>{categoryName}</span> {categoryExpenses} USD
    </Typography>
  </div>
)

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
