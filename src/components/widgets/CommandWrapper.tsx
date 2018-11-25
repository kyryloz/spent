import { createStyles, Grid, Theme, Typography, withStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import EditIcon from '@material-ui/icons/EditSharp'
import * as React from 'react'
import { formatTimestamp } from 'utils/dateUtils'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 4,
    },
    body: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    timestampWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    date: {
      color: theme.colors.date,
    },
    actionButtons: {
      marginRight: theme.spacing.unit,
    },
    editIcon: {
      marginLeft: theme.spacing.unit / 2,
      color: grey[100],
      opacity: 0.2,
      '&:hover': {
        opacity: 0.6,
      },
      '&:active': {
        opacity: 1,
      },
    },
  })

interface Props {
  classes: Classes<typeof styles>
  rawCommand: string
  timestamp: number
}

const CommandWrapperCmp: React.SFC<Props> = ({ classes, rawCommand, timestamp, children }) => (
  <Grid container className={classes.root}>
    <Grid item container direction={'row'} alignItems="center" spacing={24}>
      <Grid item>
        <Typography gutterBottom variant={'body1'}>
          > {rawCommand}{' '}
        </Typography>
      </Grid>
      <Grid item>
        <EditIcon fontSize="small" color="default" className={classes.editIcon} />
        <DeleteIcon fontSize="small" color="default" className={classes.editIcon} />
      </Grid>
    </Grid>

    <Grid item container direction="row" justify="space-between">
      <Grid item className={classes.body}>
        {children}
      </Grid>

      <div className={classes.timestampWrapper}>
        <Typography className={classes.date}>{formatTimestamp(timestamp)}</Typography>
      </div>
    </Grid>
  </Grid>
)

export const CommandWrapper = withStyles(styles)(CommandWrapperCmp)
