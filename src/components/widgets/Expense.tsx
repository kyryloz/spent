import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/EditSharp';
import { flow } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { App } from 'store/interface';
import { AccountSelector } from 'store/model/account/selectors';
import { CategorySelector } from 'store/model/category/selectors';
import { CommandSelector } from 'store/model/command/selectors';
import { formatTransactionDate } from 'utils/dateUtils';
import { Classes } from 'utils/styleUtils';

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
  command: CommandSelector.ExpenseHydratedData
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
          -{command.data.amount} USD →{' '}
          <span className={classes.category}>{command.data.category.name}</span>
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon onClick={onEditClick} fontSize="small" className={classes.actionIcon} />
        <DeleteIcon onClick={onDeleteClick} fontSize="small" className={classes.actionIcon} />
      </Grid>
    </Grid>

    <div className={classes.line} />

    <Typography className={classes.amount}>
      <span className={classes.account}>{command.data.account.name}</span> = {accountBalance} USD
    </Typography>
    <Typography className={classes.amount} gutterBottom>
      Spent on <span className={classes.category}>{command.data.category.name}</span>{' '}
      {categoryExpenses} USD
    </Typography>
    <Typography className={classes.date}>{formatTransactionDate(command.data.date)}</Typography>
    <Typography className={classes.id}>ID: {command.id}</Typography>
  </div>
)

export const Expense = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    accountBalance: AccountSelector.balance(
      ownProps.command.data.account.id,
      0,
      ownProps.command.timestamp
    )(state),
    categoryExpenses: CategorySelector.expense(
      ownProps.command.data.category.id,
      0,
      ownProps.command.timestamp
    )(state),
  }))
)(ExpenseCmp)
