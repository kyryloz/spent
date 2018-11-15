import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { Commands } from 'src/store/commands/interface'

interface ViewProps extends WithStyles<typeof styles> {
  command: Commands.CreateAccountData
}

const styles = (theme: Theme) =>
  createStyles({
    bodyTitle: {
      color: theme.colors.info,
    },
    account: {
      color: theme.colors.account,
    },
  })

const View: React.SFC<ViewProps> = ({ command, classes }) => (
  <Typography className={classes.bodyTitle}>
    Account <span className={classes.account}>{command.data.name}</span> successfully created.
  </Typography>
)

export const CreateAccount = withStyles(styles)(View)
