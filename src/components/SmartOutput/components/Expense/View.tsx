import { Typography } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({
  command,
  accountBalance,
  accountName,
  categoryExpenses,
  categoryName,
  classes,
}) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <Typography className={classes.bodyTitle}>Expense</Typography>
      <div className={classes.detailsContainer}>
        <div>
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
        <Typography className={classes.date}>{formatTimestamp(command.timestamp)}</Typography>
      </div>
    </div>
  </div>
)
