import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { AccountActionCreator } from 'store/model/account/actions'
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
  command: ReturnType<typeof AccountActionCreator.create>
}

interface StyleProps {
  classes: Classes<typeof styles>
}

const CreateAccountCmp: React.SFC<OwnProps & StyleProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Account <span className={classes.account}>{command.payload.name}</span> successfully created.
  </Typography>
)

export const CreateAccount = withStyles(styles)(CreateAccountCmp)
