import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { CategoryActionCreator } from 'store/model/category/actions'
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
  command: ReturnType<typeof CategoryActionCreator.remove>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const DeleteCategoryCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Category <span className={classes.category}>{command.payload.categoryId}</span> was deleted. All
    references are updated.
  </Typography>
)

export const DeleteCategory = withStyles(styles)(DeleteCategoryCmp)
