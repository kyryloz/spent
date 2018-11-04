import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ transaction, accountBalance, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {transaction.rawContent}
    </Typography>
    <div className={classes.body}>
      <Typography gutterBottom className={classes.bodyTitle}>
        Expense
      </Typography>
      <div className={classes.detailsContainer}>
        <div>
          <Typography className={classes.amount}>
            {transaction.details.amount} USD →{' '}
            <span className={classes.category}>{transaction.details.category}</span>
          </Typography>
          <Typography className={classes.amount}>
            <span className={classes.account}>{transaction.details.fromAccount}</span> ={' '}
            {accountBalance} USD
          </Typography>
        </div>
        <Typography className={classes.date}>{moment().format('MM MMM YYYY')}</Typography>
      </div>
    </div>
  </div>
)
