import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { App } from 'store/interface'
import { AccountSelector } from 'store/model/account/selectors'
import { CommandSelector } from 'store/model/command/selectors'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    body: {
      border: `1px solid ${theme.colors.transfer}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
    info: {
      color: theme.colors.info,
    },
    line: {
      borderTop: `1px solid ${theme.colors.transfer}`,
      margin: '8px 0 8px 0',
      opacity: 0.3,
    },
    id: {
      color: theme.colors.actionIcon,
      opacity: 0.2,
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
  command: CommandSelector.TransferHydratedData
  onEditClick: () => void
  onDeleteClick: () => void
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  fromAccountBalance: number
  toAccountBalance: number
}

const TransferCmp: React.SFC<OwnProps & StyleProps & StateProps> = ({
  command,
  onEditClick,
  onDeleteClick,
  fromAccountBalance,
  toAccountBalance,
  classes,
}) => (
  <div className={classes.body}>
    <Grid container justify="space-between" alignItems="center" spacing={40}>
      <Grid item>
        <Typography className={classes.amount}>
          <span className={classes.info}>Transfer </span>
          {command.data.amount} USD
          <span className={classes.info}> from </span>
          <span className={classes.account}>{command.data.accountFrom.name}</span>
          <span className={classes.info}> to </span>
          <span className={classes.account}>{command.data.accountTo.name}</span>
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon onClick={onEditClick} fontSize="small" className={classes.actionIcon} />
        <DeleteIcon onClick={onDeleteClick} fontSize="small" className={classes.actionIcon} />
      </Grid>
    </Grid>

    <div className={classes.line} />

    <Typography className={classes.amount} gutterBottom>
      <span className={classes.account}>{command.data.accountFrom.name}</span> ={' '}
      {fromAccountBalance} USD
    </Typography>

    <Typography className={classes.amount} gutterBottom>
      <span className={classes.account}>{command.data.accountTo.name}</span> = {toAccountBalance}{' '}
      USD
    </Typography>

    <Typography className={classes.id}>ID: {command.id}</Typography>
  </div>
)

export const Transfer = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    fromAccountBalance: AccountSelector.balance(
      ownProps.command.data.accountFrom.id,
      0,
      ownProps.command.timestamp
    )(state),
    toAccountBalance: AccountSelector.balance(
      ownProps.command.data.accountTo.id,
      0,
      ownProps.command.timestamp
    )(state),
  }))
)(TransferCmp)
