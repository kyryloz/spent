import { Typography } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({
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
