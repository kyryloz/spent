import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ transaction, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {transaction.rawContent}
    </Typography>
    <div className={classes.body}>
      <Typography gutterBottom className={classes.bodyTitle}>
        Expense
      </Typography>
      <div className={classes.detailsContainer}>
        <Typography className={classes.amount}>
          {transaction.details.amount} USD → {transaction.details.category}
        </Typography>
        <Typography className={classes.date}>{moment().format('MM MMM YYYY')}</Typography>
      </div>
    </div>
  </div>
)
