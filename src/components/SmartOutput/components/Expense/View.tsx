import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, accountBalance, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <Typography gutterBottom className={classes.bodyTitle}>
        Expense
      </Typography>
      <div className={classes.detailsContainer}>
        <div>
          <Typography className={classes.amount}>
            {command.data.amount} USD →{' '}
            <span className={classes.category}>{command.data.categoryId}</span>
          </Typography>
          <Typography className={classes.amount}>
            <span className={classes.account}>{command.data.accountId}</span> = {accountBalance}{' '}
            USD
          </Typography>
        </div>
        <Typography className={classes.date}>{moment().format('MM MMM YYYY')}</Typography>
      </div>
    </div>
  </div>
)
