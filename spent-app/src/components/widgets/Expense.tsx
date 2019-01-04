import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { App } from 'store/interface'
import { AccountSelector } from '@spent/core'
import { CategorySelector } from '@spent/core'
import { CliSelector } from 'store/model/cli/selectors'
import { formatTimestamp } from 'utils/dateUtils'
import { Classes } from 'utils/styleUtils'
import { coreSelector } from '../../store/appSelector';

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
    id: {
      color: theme.colors.actionIcon,
      opacity: 0.2,
    },
    date: {
      color: theme.colors.date,
    },
    line: {
      borderTop: `1px solid ${theme.colors.expense}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
    actionIcon: {
      marginTop: theme.spacing.unit / 2,
      marginLeft: theme.spacing.unit / 2,
      color: theme.colors.actionIcon,
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
  command: CliSelector.ExpenseCommand
  onEditClick: () => void
  onDeleteClick: () => void
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  accountBalance: number
  categoryExpenses: number
}

export const ExpenseCmp: React.SFC<StateProps & OwnProps & StyleProps> = ({
  command,
  onEditClick,
  onDeleteClick,
  accountBalance,
  categoryExpenses,
  classes,
}) => (
  <div className={classes.body}>
    <Grid container justify="space-between" alignItems="center" spacing={40}>
      <Grid item>
        <Typography className={classes.amount}>
          -{command.action.payload.amount} USD →{' '}
          <span className={classes.category}>{command.action.payload.category.name}</span>
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon onClick={onEditClick} fontSize="small" className={classes.actionIcon} />
        <DeleteIcon onClick={onDeleteClick} fontSize="small" className={classes.actionIcon} />
      </Grid>
    </Grid>

    <div className={classes.line} />

    <Typography className={classes.amount}>
      <span className={classes.account}>{command.action.payload.account.name}</span> ={' '}
      {accountBalance} USD
    </Typography>
    <Typography className={classes.amount} gutterBottom>
      Spent on <span className={classes.category}>{command.action.payload.category.name}</span>{' '}
      {categoryExpenses} USD
    </Typography>
    <Typography className={classes.date}>
      {formatTimestamp(command.action.payload.timestamp)}
    </Typography>
  </div>
)

export const Expense = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    accountBalance: AccountSelector.balance(
      ownProps.command.action.payload.account.id,
      0,
      ownProps.command.timestamp
    )(coreSelector(state)),
    categoryExpenses: CategorySelector.totalExpense(
      ownProps.command.action.payload.category.id,
      0,
      ownProps.command.timestamp
    )(coreSelector(state)),
  }))
)(ExpenseCmp)