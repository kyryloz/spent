import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { CommandModel } from 'store/model/command/interface'
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
  command: CommandModel.DeleteTransactionData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const DeleteTransactionCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Transaction <span className={classes.category}>{command.data.commandId}</span> was deleted.
  </Typography>
)

export const DeleteTransaction = withStyles(styles)(DeleteTransactionCmp)
