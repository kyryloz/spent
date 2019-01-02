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
  command: ReturnType<typeof TransactionActionCreator.updateIncome>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const UpdateIncomeCmp: React.SFC<OwnProps & StyleProps> = ({ classes }) => (
  <Typography className={classes.bodyTitle}>Income was updated.</Typography>
)

export const UpdateIncome = withStyles(styles)(UpdateIncomeCmp)
