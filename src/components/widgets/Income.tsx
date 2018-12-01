import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { accountsSelector } from 'store/model/accounts/selectors'
import { Commands } from 'store/model/commands/interface'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    body: {
      border: `1px solid ${theme.colors.income}`,
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
    line: {
      borderTop: `1px solid ${theme.colors.income}`,
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
  command: Commands.IncomeData
  onEditClick: () => void
  onDeleteClick: () => void
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  accountBalance: number
  accountName: string
}

const IncomeCmp: React.SFC<OwnProps & StyleProps & StateProps> = ({
  command,
  onEditClick,
  onDeleteClick,
  accountBalance,
  accountName,
  classes,
}) => (
  <div className={classes.body}>
    <Grid container justify="space-between" alignItems="center" spacing={40}>
      <Grid item>
        <Typography className={classes.amount}>
          +{command.data.amount} USD → <span className={classes.account}>{accountName}</span>
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon onClick={onEditClick} fontSize="small" className={classes.actionIcon} />
        <DeleteIcon onClick={onDeleteClick} fontSize="small" className={classes.actionIcon} />
      </Grid>
    </Grid>

    <div className={classes.line} />

    <Typography className={classes.amount} gutterBottom>
      <span className={classes.account}>{accountName}</span> = {accountBalance} USD
    </Typography>
    <Typography className={classes.id}>ID: {command.id}</Typography>
  </div>
)

export const Income = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    accountBalance: accountsSelector.balance(
      ownProps.command.data.accountId,
      0,
      ownProps.command.timestamp
    )(state),
    accountName: accountsSelector.findById(ownProps.command.data.accountId)(state),
  }))
)(IncomeCmp)
