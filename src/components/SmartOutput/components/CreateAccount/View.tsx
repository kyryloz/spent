import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom className={classes.rawContent}>
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
        <Typography className={classes.date}>
          {moment.unix(command.timestamp).format('MM MMM YYYY')}
        </Typography>
      </div>
    </div>
  </div>
)
