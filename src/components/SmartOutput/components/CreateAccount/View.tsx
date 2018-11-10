import { Typography } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom variant={'body1'}>
      > {command.raw}
    </Typography>
    <div className={classes.body}>
      <div className={classes.detailsContainer}>
        <div>
          <Typography className={classes.bodyTitle}>
            Account <span className={classes.account}>{command.data.name}</span> successfully
            created.
          </Typography>
        </div>
        <Typography className={classes.date}>{formatTimestamp(command.timestamp)}</Typography>
      </div>
    </div>
  </div>
)
