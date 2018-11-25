import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { accountsSelector } from 'store/accounts/selectors'
import { categoriesSelector } from 'store/categories/selectors'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

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

interface OwnProps {
  command: Commands.ExpenseData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  accountBalance: number
  accountName: string
  categoryExpenses: number
  categoryName: string
}

export const ExpenseCmp: React.SFC<StateProps & OwnProps & StyleProps> = ({
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

export const Expense = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
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
  }))
)(ExpenseCmp)
