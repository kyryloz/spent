import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
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
    actionIcon: {
      marginTop: theme.spacing.unit / 2,
      marginLeft: theme.spacing.unit / 2,
      color: grey[100],
      opacity: 0.2,
      '&:hover': {
        opacity: 0.6,
      },
      '&:active': {
        opacity: 1,
      },
    },
  })

interface OwnProps {
  command: Commands.ExpenseData
  onEditClick: () => void
  onDeleteClick: () => void
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
  onEditClick,
  onDeleteClick,
  accountBalance,
  accountName,
  categoryExpenses,
  categoryName,
  classes,
}) => (
  <div className={classes.body}>
    <Grid container justify="space-between" alignItems="center" spacing={40}>
      <Grid item>
        <Typography className={classes.amount}>
          -{command.data.amount} USD → <span className={classes.category}>{categoryName}</span>
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon onClick={onEditClick} fontSize="small" className={classes.actionIcon} />
        <DeleteIcon onClick={onDeleteClick} fontSize="small" className={classes.actionIcon} />
      </Grid>
    </Grid>

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
