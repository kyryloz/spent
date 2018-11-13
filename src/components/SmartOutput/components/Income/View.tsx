import { Typography } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, accountBalance, accountName, classes }) => (
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
