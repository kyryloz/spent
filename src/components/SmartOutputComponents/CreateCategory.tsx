import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { Commands } from 'store/commands/interface'
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

interface Props {
  classes: Classes<typeof styles>
  command: Commands.CreateCategoryData
}

const CreateCategoryCmp: React.SFC<Props> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Category <span className={classes.category}>{command.data.name}</span> successfully created.
  </Typography>
)

export const CreateCategory = withStyles(styles)(CreateCategoryCmp)
