import { Typography } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, accountBalance, accountName, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <Typography className={classes.bodyTitle}>Income</Typography>
      <div className={classes.detailsContainer}>
        <div>
          <Typography className={classes.amount}>
            +{command.data.amount} USD → <span className={classes.account}>{accountName}</span>
          </Typography>
          <div className={classes.line} />
          <Typography className={classes.amount}>
            <span className={classes.account}>{accountName}</span> = {accountBalance} USD
          </Typography>
        </div>
        <Typography className={classes.date}>{formatTimestamp(command.timestamp)}</Typography>
      </div>
    </div>
  </div>
)
