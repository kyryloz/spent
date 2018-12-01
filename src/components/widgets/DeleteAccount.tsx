import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { CommandModel } from 'store/model/command/interface'
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
  command: CommandModel.DeleteEntityData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const DeleteAccountCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Account <span className={classes.account}>{command.data.entityName}</span> was deleted. All
    references are updated.
  </Typography>
)

export const DeleteAccount = withStyles(styles)(DeleteAccountCmp)
