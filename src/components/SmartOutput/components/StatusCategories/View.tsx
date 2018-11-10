import { Typography } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, categories, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <div className={classes.detailsContainer}>
        <div>
          {toPairs(categories).map(([name, balance]) => (
            <Typography className={classes.amount}>
              Spent {balance} USD on <span className={classes.category}>{name}</span>
            </Typography>
          ))}
        </div>
        <Typography className={classes.date}>{formatTimestamp(command.timestamp)}</Typography>
      </div>
    </div>
  </div>
)
