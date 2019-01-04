import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import { TransactionActionCreator } from '@spent/core'
import * as React from 'react'
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
  command: ReturnType<typeof TransactionActionCreator.updateTransfer>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const UpdateTransferCmp: React.SFC<OwnProps & StyleProps> = ({ classes }) => (
  <Typography className={classes.bodyTitle}>Transfer was updated.</Typography>
)

export const UpdateTransfer = withStyles(styles)(UpdateTransferCmp)
