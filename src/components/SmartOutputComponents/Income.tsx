import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { accountsSelector } from '../../store/accounts/selectors'
import { Commands } from '../../store/commands/interface'
import { App } from '../../store/interface'

interface OutterProps {
  command: Commands.IncomeData
}

interface ConnectedProps {
  accountBalance: number
  accountName: string
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

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
  })

const View: React.SFC<ViewProps> = ({ command, accountBalance, accountName, classes }) => (
  <div className={classes.body}>
    <Typography className={classes.amount}>
      +{command.data.amount} USD → <span className={classes.account}>{accountName}</span>
    </Typography>
    <div className={classes.line} />
    <Typography className={classes.amount}>
      <span className={classes.account}>{accountName}</span> = {accountBalance} USD
    </Typography>
  </div>
)

export const Income = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    accountBalance: accountsSelector.balance(
      ownProps.command.data.accountId,
      0,
      ownProps.command.timestamp
    )(state),
    accountName: accountsSelector.findById(ownProps.command.data.accountId)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Income')
)(View)
