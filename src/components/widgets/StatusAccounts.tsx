import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import { flow, toPairs } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { accountsSelector } from 'store/accounts/selectors'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
  })

interface OwnProps {
  command: Commands.StatusData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  accounts: {
    [name: string]: number
  }
}

const StatusAccountsCmp: React.SFC<OwnProps & StyleProps & StateProps> = ({
  accounts,
  classes,
}) => (
  <React.Fragment>
    {toPairs(accounts).map(([name, balance]) => (
      <Typography className={classes.amount}>
        <span className={classes.account}>{name}</span> = {balance} USD
      </Typography>
    ))}
  </React.Fragment>
)

export const StatusAccounts = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    accounts: accountsSelector.balances(0, ownProps.command.timestamp)(state),
  }))
)(StatusAccountsCmp)
