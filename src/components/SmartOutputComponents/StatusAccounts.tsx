import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { Commands } from 'src/store/commands/interface'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { accountsSelector } from '../../store/accounts/selectors'
import { App } from '../../store/interface'

interface OutterProps {
  command: Commands.StatusData
}

interface ConnectedProps {
  accounts: {
    [name: string]: number
  }
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    account: {
      color: theme.colors.account,
    },
  })

const View: React.SFC<ViewProps> = ({ accounts, classes }) => (
  <React.Fragment>
    {toPairs(accounts).map(([name, balance]) => (
      <Typography className={classes.amount}>
        <span className={classes.account}>{name}</span> = {balance} USD
      </Typography>
    ))}
  </React.Fragment>
)

export const StatusAccounts = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    accounts: accountsSelector.balances(0, ownProps.command.timestamp)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('StatusAccounts')
)(View)
