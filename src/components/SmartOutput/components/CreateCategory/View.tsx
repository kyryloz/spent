import { Typography } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Category <span className={classes.category}>{command.data.name}</span> successfully created.
  </Typography>
)
