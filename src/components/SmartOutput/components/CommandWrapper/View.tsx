import { Typography } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ rawCommand, timestamp, classes, children }) => (
  <div className={classes.root}>
    <Typography gutterBottom variant={'body1'}>
      > {rawCommand}
    </Typography>
    <div className={classes.body}>
      <div className={classes.detailsContainer}>
        <div>
          {children}
        </div>
        <Typography className={classes.date}>{formatTimestamp(timestamp)}</Typography>
      </div>
    </div>
  </div>
)
