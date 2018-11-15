import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { formatTimestamp } from 'src/utils/dateUtils'
import { App } from '../../store/interface'

interface OutterProps {
  rawCommand: string
  timestamp: number
}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

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

const View: React.SFC<ViewProps> = ({ rawCommand, timestamp, classes, children }) => (
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

export const CommandWrapper = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('CommandWrapper')
)(View)
