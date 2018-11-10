import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({
  command,
  accountBalance,
  accountName,
  classes,
}) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <Typography className={classes.bodyTitle}>
        Income
      </Typography>
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
        <Typography className={classes.date}>
          {moment.unix(command.timestamp).format('MM MMM YYYY')}
        </Typography>
      </div>
    </div>
  </div>
)
