import { Typography } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, accounts, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <div className={classes.detailsContainer}>
        <div>
          {toPairs(accounts).map(([name, balance]) => (
            <Typography className={classes.amount}>
              <span className={classes.account}>{name}</span> = {balance} USD
            </Typography>
          ))}
        </div>
        <Typography className={classes.date}>{formatTimestamp(command.timestamp)}</Typography>
      </div>
    </div>
  </div>
)
