import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { TransactionActionCreator } from 'store/model/transactions/actions'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    account: {
      color: theme.colors.account,
    },
  })

interface OwnProps {
  command: ReturnType<typeof TransactionActionCreator.updateExpense>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const UpdateExpenseCmp: React.SFC<OwnProps & StyleProps> = ({ classes }) => (
  <Typography className={classes.bodyTitle}>Expense was updated.</Typography>
)

export const UpdateExpense = withStyles(styles)(UpdateExpenseCmp)
