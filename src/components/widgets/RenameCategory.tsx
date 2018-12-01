import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { Commands } from 'store/model/commands/interface'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    category: {
      color: theme.colors.category,
    },
  })

interface OwnProps {
  command: Commands.RenameEntityData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const RenameCategoryCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Account <span className={classes.category}>{command.data.entityOldName}</span> renamed to{' '}
    <span className={classes.category}>{command.data.entityNewName}</span>. All references are
    updated.
  </Typography>
)

export const RenameCategory = withStyles(styles)(RenameCategoryCmp)
