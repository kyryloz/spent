import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import * as React from 'react'
import { Commands } from 'src/store/commands/interface'

interface ViewProps extends WithStyles<typeof styles> {
  command: Commands.CreateCategoryData
}

const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    category: {
      color: theme.colors.category,
    },
  })

const View: React.SFC<ViewProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Category <span className={classes.category}>{command.data.name}</span> successfully created.
  </Typography>
)

export const CreateCategory = withStyles(styles)(View)
