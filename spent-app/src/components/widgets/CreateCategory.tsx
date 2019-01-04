import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { CategoryActionCreator } from '@spent/core'
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
  command: ReturnType<typeof CategoryActionCreator.create>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const CreateCategoryCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Category <span className={classes.category}>{command.payload.name}</span> successfully created.
  </Typography>
)

export const CreateCategory = withStyles(styles)(CreateCategoryCmp)
