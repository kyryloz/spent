import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import * as React from 'react'
import { Commands } from 'src/store/commands/interface'
import { Classes } from 'src/utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    account: {
      color: theme.colors.account,
    },
  })

interface Props {
  classes: Classes<typeof styles>
  command: Commands.CreateAccountData
}

const CreateAccountCmp: React.SFC<Props> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Account <span className={classes.account}>{command.data.name}</span> successfully created.
  </Typography>
)

export const CreateAccount = withStyles(styles)(CreateAccountCmp)
