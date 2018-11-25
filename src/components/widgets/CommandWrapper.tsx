import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'utils/dateUtils'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    body: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    date: {
      color: theme.colors.date,
    },
  })

interface Props {
  classes: Classes<typeof styles>
  rawCommand: string
  timestamp: number
}

const CommandWrapperCmp: React.SFC<Props> = ({ classes, rawCommand, timestamp, children }) => (
  <div className={classes.root}>
    <Typography gutterBottom variant={'body1'}>
      > {rawCommand}
    </Typography>
    <div className={classes.body}>
      <div className={classes.detailsContainer}>
        <div>{children}</div>
        <Typography className={classes.date}>{formatTimestamp(timestamp)}</Typography>
      </div>
    </div>
  </div>
)

export const CommandWrapper = withStyles(styles)(CommandWrapperCmp)
