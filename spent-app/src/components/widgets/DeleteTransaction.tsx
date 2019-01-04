import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { TransactionActionCreator } from '@spent/core'
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
  command: ReturnType<typeof TransactionActionCreator.remove>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const DeleteTransactionCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Transaction <span className={classes.category}>{command.payload.transactionId}</span> was
    deleted.
  </Typography>
)

export const DeleteTransaction = withStyles(styles)(DeleteTransactionCmp)
